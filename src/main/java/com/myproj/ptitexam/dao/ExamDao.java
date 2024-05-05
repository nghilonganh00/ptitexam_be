package com.myproj.ptitexam.dao;


import com.myproj.ptitexam.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamDao extends JpaRepository<Exam, Integer> {
    List<Exam> findByExamTitleContaining(String examTitle);
    Exam findByExamTitle(String examTitle);
    boolean existsById(Integer Id);
}
