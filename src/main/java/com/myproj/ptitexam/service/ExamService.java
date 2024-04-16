package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.model.Exam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    ExamDao examDao;

    public List<Exam> getAllExams() {
        return examDao.findAll();
    }

}
