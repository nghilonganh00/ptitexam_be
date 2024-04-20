package com.myproj.ptitexam.dao;

import com.myproj.ptitexam.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamResultDao extends JpaRepository<ExamResult,Integer> {
}
