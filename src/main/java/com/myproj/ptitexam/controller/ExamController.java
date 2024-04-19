package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import com.myproj.ptitexam.service.ExamService;
import com.myproj.ptitexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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


    @Autowired
    QuestionService questionService;

    @GetMapping("/{exam_id}/questions")
    public ResponseEntity<List<Question>> getAllQuestions(@PathVariable Integer exam_id){
        return questionService.getAllQuestions(exam_id);

    }









}
