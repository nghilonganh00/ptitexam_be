package com.myproj.ptitexam.service;

import com.myproj.ptitexam.DTO.ResultDetailDTO;
import com.myproj.ptitexam.DTO.UserAnswerReponse;
import com.myproj.ptitexam.dao.*;
import com.myproj.ptitexam.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<List<Exam>> getAllexams() {
        try {
            List<Exam> list_exam = examDao.findAll();
            if(list_exam == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(list_exam, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    public ResponseEntity<String> editExam(Integer examId, Exam updatedExam) {
        try {
            Exam existingExam = examDao.findById(examId)
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

            existingExam.setExamTitle(updatedExam.getExamTitle());
            existingExam.setExamDescription(updatedExam.getExamDescription());
            existingExam.setStartTime(updatedExam.getStartTime());
            existingExam.setEndTime(updatedExam.getEndTime());
            existingExam.setListQuestion(updatedExam.getListQuestion());
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
            examDao.deleteById(examId);
            return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Delete failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Exam>> getByExamTitleContaining(String examTitle) {
        try {
            List<Exam> list_exam = examDao.findByExamTitleContaining(examTitle);
            if(list_exam == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
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


    public ResponseEntity<String> createExam(Exam exam) {
        try {
            examDao.save(exam);
            return new ResponseEntity<>("Sign up success", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
    }

    public List<Exam> getAllExams() {
        return examDao.findAll();
    }

    public List<Question> getAllQuestion(int exam_id){
        return questionDao.findAll();
    }

    public ResponseEntity<?> deleteAllQuestionsInExam( Integer id) {
        List<Question> questions = questionDao.findByExamId(id);

        if (questions == null) {
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        }

        questionDao.deleteAll(questions);


        return new ResponseEntity<>("All questions in the exam have been deleted", HttpStatus.OK);
    }

    public ResponseEntity<?> caculateScore(int user_id,int exam_id, List<UserAnswerReponse> reponses) {
        Optional<Exam> exam = examDao.findById(exam_id);
        Optional<User> user = userDao.findById(user_id);
        if (exam==null ){
            return new ResponseEntity<String>("Submit failed, exam not found", HttpStatus.NOT_FOUND);
        }
        if (user==null ){
            return new ResponseEntity<String>("Submit failed, user not found", HttpStatus.NOT_FOUND);
        }
        ExamResult examResult = new ExamResult();
        examResult.setExam(exam.get());
        examResult.setUser(user.get());
        examResultDao.save(examResult);
        List<Question> questions = exam.get().getListQuestion();
        int num=0;
        for(UserAnswerReponse reponse:reponses){
            Optional<Question> question = questionDao.findById(reponse.getId());
            ExamResultDetail erd = new ExamResultDetail(examResult,question.get(), reponse.getAnswer());
            resultDetailDao.save(erd);
            if( reponse.getAnswer().equals(question.get().getAnswer()))
                num++;
        }
        double score = (double)num/questions.size()*10.0;

        examResult.setScore(score);
        examResultDao.save(examResult);
        return new ResponseEntity<Double>(score,HttpStatus.OK);
    }

    public ResponseEntity<?> getAnswerInExam(int resultId) {
        Optional<ExamResult> er = examResultDao.findById(resultId);
        List<ExamResultDetail> examResultDetail= resultDetailDao.findByExamResult(er.get());
        if(examResultDetail==null){
            return new ResponseEntity<String>("Not found", HttpStatus.NOT_FOUND);
        }
        List<ResultDetailDTO> list =new ArrayList<>();
        for(ExamResultDetail detail:examResultDetail){
            ResultDetailDTO temp  = new ResultDetailDTO(detail.getQuestion().getContent(),detail.getQuestion().getOption1(),detail.getQuestion().getOption2(),detail.getQuestion().getOption3(),detail.getQuestion().getOption4(),detail.getAnswer(),detail.getQuestion().getAnswer());
            list.add(temp);
        }

        return new ResponseEntity<List<ResultDetailDTO>>(list,HttpStatus.OK);
    }
}
