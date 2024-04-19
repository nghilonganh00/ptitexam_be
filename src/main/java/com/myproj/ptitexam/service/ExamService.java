package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.dao.QuestionDao;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
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
