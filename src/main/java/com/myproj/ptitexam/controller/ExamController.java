package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.DTO.ExamDto;
import com.myproj.ptitexam.DTO.ResultDetailDTO;
import com.myproj.ptitexam.DTO.UserAnswerReponse;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;

import com.myproj.ptitexam.model.User;

import com.myproj.ptitexam.service.ExamService;
import com.myproj.ptitexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("exam")
public class ExamController {
    @Autowired
    ExamService examService;
    @Autowired
    QuestionService questionService;
    // Hiển thị bài thi
    @GetMapping("/getAllExams")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllExams(){
        return examService.getAllExams();
    }

    @GetMapping("/getExams")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getExams(@RequestParam int type){
        return examService.getExams(type);
    }

    // Sửa bài thi
    @PutMapping("edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> editExam(@RequestParam Integer examId, @RequestBody ExamDto updatedExam) {
        return examService.editExam(examId, updatedExam);
    }

    // Xóa bài thi
    @DeleteMapping("delete")
    public ResponseEntity<String> deleteExam(@RequestParam Integer examId) {
        return examService.deleteExam(examId);
    }

    // lấy ra bài thi trong list
    @GetMapping("getByExamTitleContaining")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getByExamTitleContaining(@RequestBody String examTitle) {
        return examService.getByExamTitleContaining(examTitle);
    }

    @GetMapping("/getExam")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllQuestions(@RequestParam Integer exam_id){
        return questionService.getAllQuestions(exam_id);

    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllQuestionsAdmin(@RequestParam Integer exam_id){
        return questionService.getAllQuestionsAdmin(exam_id);

    }

    @PostMapping("createExam")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createExam(@RequestBody ExamDto exam){
        return examService.createExam(exam);
    }


    @PostMapping("/submit")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> caculateScore(@RequestParam int user_id,@RequestParam int exam_id, @RequestBody List<UserAnswerReponse> reponses){
        return examService.caculateScore(user_id,exam_id,reponses);
    }

    @GetMapping("review")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAnswerInExam(@RequestParam int resultId){
        return examService.getAnswerInExam(resultId);
    }

    @GetMapping("")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
