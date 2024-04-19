package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import com.myproj.ptitexam.model.User;
import com.myproj.ptitexam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("createExam")
    public ResponseEntity<String> createExam(@RequestBody Exam exam){
        return examService.createExam(exam);
    }

}
