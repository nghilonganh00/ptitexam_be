package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.dao.QuestionDao;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    ExamDao examDao;
    @Autowired
    QuestionDao questionDao;
    public List<Exam> getAllExams() {
        return examDao.findAll();
    }

    public List<Question> getAllQuestion(){
        return questionDao.findAll();
    }


}
