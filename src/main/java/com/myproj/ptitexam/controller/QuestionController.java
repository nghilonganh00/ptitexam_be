package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.DTO.QuestionDTO;
import com.myproj.ptitexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;


    @PostMapping("/create")
    public ResponseEntity<String> createQuestion(@RequestBody QuestionDTO questionDTO) {
        return questionService.createQuestion(questionDTO);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editUser(@PathVariable Integer id, @RequestBody QuestionDTO updatedQuestion) {
        return questionService.editQuestion(id, updatedQuestion);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int id) {
        System.out.println("id: " + id);
        return questionService.deleteQuestion(id);
    }
    
}
