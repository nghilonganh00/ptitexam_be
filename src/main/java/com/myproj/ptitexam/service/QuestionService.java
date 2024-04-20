package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.dao.QuestionDao;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import com.myproj.ptitexam.DTO.QuestionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    @Autowired
    ExamDao examDao;

    public ResponseEntity<String> createQuestion(QuestionDTO questionDTO) {
        try {
            Exam exam = examDao.findById(questionDTO.getExamId())
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found"));


            Question question = new Question();
            question.setContent(questionDTO.getContent());
            question.setOption1(questionDTO.getOption1());
            question.setOption2(questionDTO.getOption2());
            question.setOption3(questionDTO.getOption3());
            question.setOption4(questionDTO.getOption4());
            question.setAnswer(questionDTO.getAnswer());
            question.setExam(exam);

            questionDao.save(question);
            return new ResponseEntity<>("Create question success", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<List<Question>> getAllQuestions(Integer examId) {
        try {
            List<Question> list_question = questionDao.findByExamId(examId);
            if(list_question == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(list_question, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> editQuestion(Integer id, QuestionDTO updatedQuestion) {
        try {
            Question existingQuestion = questionDao.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Question not found"));

//            Exam exam = examDao.findById(updatedQuestion.getExamId())
//                    .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

//            existingQuestion.setExam_id(updatedQuestion.getExam_id());
            existingQuestion.setContent(updatedQuestion.getContent());
            existingQuestion.setOption1(updatedQuestion.getOption1());
            existingQuestion.setOption2(updatedQuestion.getOption2());
            existingQuestion.setOption3(updatedQuestion.getOption3());
            existingQuestion.setOption4(updatedQuestion.getOption4());
            existingQuestion.setAnswer(updatedQuestion.getAnswer());
//            existingQuestion.setExam(exam);

            questionDao.save(existingQuestion);
            return new ResponseEntity<>("Update successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Edit failed", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteQuestion(Integer id) {
        try {
            questionDao.deleteById(id);
            return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Delete failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
