package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import com.myproj.ptitexam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("exam")
public class ExamController {
    @Autowired
    ExamService examService;

    @GetMapping("allExams")
    public List<Exam> getAllExams(){
        return examService.getAllExams();
    }


}
