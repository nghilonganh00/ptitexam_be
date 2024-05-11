package com.myproj.ptitexam.service;

import com.myproj.ptitexam.DTO.ExamDto;
import com.myproj.ptitexam.DTO.ResultDetailDTO;
import com.myproj.ptitexam.DTO.UserAnswerReponse;
import com.myproj.ptitexam.dao.*;
import com.myproj.ptitexam.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    ExamDao examDao;
    @Autowired
    QuestionDao questionDao;
    @Autowired
    UserDao userDao;
    @Autowired
    ExamResultDao examResultDao;
    @Autowired
    ResultDetailDao resultDetailDao;



    public ResponseEntity<String> editExam(Integer examId, ExamDto updatedExam) {
        try {
            Exam existingExam = examDao.findById(examId)
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
            existingExam.setExamTitle(updatedExam.getExamTitle());
            existingExam.setExamDescription(updatedExam.getExamDescription());

            if(updatedExam.getStartTime()!=null){
                existingExam.setStartTime(Timestamp.valueOf(updatedExam.getStartTime()));
            }
            if(updatedExam.getEndTime()!=null){
                existingExam.setEndTime(Timestamp.valueOf(updatedExam.getEndTime()));
            }
            List<Question> listQ = updatedExam.getQuestionList();
            for(Question question: listQ )
                question.setExam(existingExam);
            existingExam.setListQuestion(listQ);
            ResponseEntity<?> a= deleteAllQuestionsInExam(examId);
            examDao.save(existingExam);
            return new ResponseEntity<>("Update successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Edit failed", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteExam(Integer examId) {
        try {
            Exam exam = examDao.findById(examId).orElseThrow(() -> new RuntimeException("Not found exam"));
            deleteAllQuestionsInExam(examId);

            List<ExamResult> examResults = examResultDao.findByExam(exam);
            examResultDao.deleteAll(examResults);

            
            examDao.deleteById(examId);
            return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Delete failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getByExamTitleContaining(String examTitle) {
        try {
            List<Exam> list_exam = examDao.findByExamTitleContaining(examTitle);
            if(list_exam.isEmpty()) {
                return new ResponseEntity<>("No Exam", HttpStatus.OK);
            }
            return new ResponseEntity<>(list_exam, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> addExam(Exam exam) {
        try {
            examDao.save(exam);
            return new ResponseEntity<>("Add success", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> createExam(ExamDto exam) {
        try {
            Exam newExam = new Exam();
            newExam.setExamTitle(exam.getExamTitle());
            newExam.setExamDescription(exam.getExamDescription());
            if(exam.getStartTime()!=null){
                newExam.setStartTime(Timestamp.valueOf(exam.getStartTime()));
            }
            if(exam.getEndTime()!=null){
                newExam.setEndTime(Timestamp.valueOf(exam.getEndTime()));
            }
            List<Question> listQ = exam.getQuestionList();
            for(Question question: listQ )
                question.setExam(newExam);
            newExam.setListQuestion(listQ);
            examDao.save(newExam);
            return new ResponseEntity<>("Create success", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed: " + e, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getAllExams() {
        try {
            List<Exam> list_exam = examDao.findAll();
            if(list_exam.isEmpty()) {
                return new ResponseEntity<>("There are no exams", HttpStatus.OK);
            }
            return new ResponseEntity<>(list_exam, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> deleteAllQuestionsInExam( Integer id) {
        List<Question> questions = questionDao.findByExamId(id);

        // ExamResult examResult = examResultDao.findByExam()
        // examResultDao.delete();

        for(Question question: questions) {
            List<ExamResultDetail> examResultDeitalList = resultDetailDao.findByQuestion(question);
            resultDetailDao.deleteAll(examResultDeitalList);

            questionDao.delete(question);
        }

        if (questions == null) {
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        }

        questionDao.deleteAll(questions);


        return new ResponseEntity<>("All questions in the exam have been deleted", HttpStatus.OK);
    }

    public ResponseEntity<?> caculateScore(int take_id, List<UserAnswerReponse> reponses) {
        try {

            ExamResult examResult= examResultDao.findById(take_id).orElseThrow(() -> new Exception("Not found"));
            System.out.println("hi");
            List<Question> questions = examResult.getExam().getListQuestion();

            int num = 0;
            for (UserAnswerReponse reponse : reponses) {
                Question question = questionDao.findById(reponse.getId()).orElseThrow(()-> new Exception("Loi cau hoi"));
                ExamResultDetail erd = new ExamResultDetail(examResult, question, reponse.getAnswer());
                resultDetailDao.save(erd);
                if (reponse.getAnswer().equals(question.getAnswer()))
                    num++;
                System.out.println("hi");
            }
            double score = (double) num / questions.size() * 10.0;
            examResult.setEndTime(new Timestamp(System.currentTimeMillis()));
            examResult.setScore(score);
            examResultDao.save(examResult);
            return new ResponseEntity<Double>(score, HttpStatus.OK);
        } catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>("Submit failed",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getAnswerInExam(int resultId) {
        try {
            ExamResult er = examResultDao.findById(resultId).orElseThrow(()-> new Exception(""));
            List<ExamResultDetail> examResultDetail = resultDetailDao.findByExamResult(er);
            List<ResultDetailDTO> list = new ArrayList<>();
            for (ExamResultDetail detail : examResultDetail) {
                ResultDetailDTO temp = new ResultDetailDTO(detail.getQuestion().getContent(), detail.getQuestion().getOption1(), detail.getQuestion().getOption2(), detail.getQuestion().getOption3(), detail.getQuestion().getOption4(), detail.getAnswer(), detail.getQuestion().getAnswer());
                list.add(temp);
            }

            return new ResponseEntity<List<ResultDetailDTO>>(list, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("Not found!", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getExams(int type) {
        List<Exam> listExam= examDao.findAll();
        List<Exam> unlimited = new ArrayList<>();
        List<Exam> limited = new ArrayList<>();
        for(Exam exam:listExam){
            if(exam.getStartTime()==null){
                unlimited.add(exam);
            }else {
                limited.add(exam);
            }
        }
        if(type==0){
            if(unlimited.isEmpty())
                return new ResponseEntity<>("There are no exam!",HttpStatus.OK);
            return new ResponseEntity<>(unlimited,HttpStatus.OK);
        }else if(type==1) {
            if(limited.isEmpty())
                return new ResponseEntity<>("There are no exam!",HttpStatus.OK);
            return new ResponseEntity<>(limited,HttpStatus.OK);
        }
        return new ResponseEntity<>("khong hop le",HttpStatus.BAD_REQUEST);
    }

}
