package com.myproj.ptitexam.dao;

import com.myproj.ptitexam.model.ExamResult;
import com.myproj.ptitexam.model.ExamResultDetail;
import com.myproj.ptitexam.model.ExamResultDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultDetailDao extends JpaRepository<ExamResultDetail, ExamResultDetailId> {
    List<ExamResultDetail> findByExamResult(ExamResult examResult);
}
