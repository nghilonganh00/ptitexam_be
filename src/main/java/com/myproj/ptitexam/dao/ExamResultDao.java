package com.myproj.ptitexam.dao;

import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.ExamResult;


import com.myproj.ptitexam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultDao extends JpaRepository<ExamResult,Integer> {
    List<ExamResult> findByExam(Exam exam);
    List<ExamResult> findByUser(User user);
}
