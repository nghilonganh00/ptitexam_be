package com.myproj.ptitexam.dao;


import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, Integer> {
    List<Question> findByExamId(Integer examId);
    List<Question> findByExam(Exam exam);
    
    @Modifying
    @Query(value = "DELETE FROM question WHERE id = ?1", nativeQuery = true)
    void deleteById(int questionId);
}
