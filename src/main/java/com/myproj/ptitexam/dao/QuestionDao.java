package com.myproj.ptitexam.dao;

import com.myproj.ptitexam.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionDao extends JpaRepository<Question,Integer> {
}
