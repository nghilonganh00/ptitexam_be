package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.dao.QuestionDao;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    ExamDao examDao;
    @Autowired
    QuestionDao questionDao;
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
    public List<Question> getAllQuestion(){
        return questionDao.findAll();
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

    public List<Question> getAllQuestion(){
        return questionDao.findAll();
    }


}
