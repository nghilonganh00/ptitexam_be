package com.myproj.ptitexam.dao;


import com.myproj.ptitexam.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamDao extends JpaRepository<Exam, Integer> {

}
