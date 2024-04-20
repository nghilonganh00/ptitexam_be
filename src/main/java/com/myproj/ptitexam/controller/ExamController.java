package com.myproj.ptitexam.controller;


import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;

import com.myproj.ptitexam.model.User;

import com.myproj.ptitexam.service.ExamService;
import com.myproj.ptitexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
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


import java.util.List;

@RestController
@RequestMapping("exam")
public class ExamController {
    @Autowired
    ExamService examService;

    // Hiển thị bài thi
    @GetMapping("/getAllexams")
    public ResponseEntity<List<Exam>> getAllexams() {
        return examService.getAllexams();
    }

    // Sửa bài thi
    @PutMapping("edit/{examId}")
    public ResponseEntity<String> editExam(@PathVariable Integer examId, @RequestBody Exam updatedExam) {
        return examService.editExam(examId, updatedExam);
    }
    // Thêm bài thi
    @PostMapping("/addExam")
    public ResponseEntity<String> addExam(@RequestBody Exam exam) {
        return examService.addExam(exam);
    }

    // Xóa bài thi
    @DeleteMapping("delete/{examId}")
    public ResponseEntity<String> deleteExam(@PathVariable Integer examId) {
        return examService.deleteExam(examId);
    }

    // lấy ra bài thi trong list
    @GetMapping("getByExamTitleContaining")
    public ResponseEntity<java.util.List<Exam>> getByExamTitleContaining(@RequestParam String examTitle) {
        return examService.getByExamTitleContaining(examTitle);
    }
    @GetMapping("/{exam_id}/questions")
    public ResponseEntity<List<Question>> getAllQuestions(@PathVariable Integer exam_id){
        return questionService.getAllQuestions(exam_id);

    }
    @PostMapping("createExam")
    public ResponseEntity<String> createExam(@RequestBody Exam exam){
        return examService.createExam(exam);
    }

}
