package com.myproj.ptitexam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproj.ptitexam.model.ResetPasswordToken;

public interface ResetPasswordTokenDao extends JpaRepository<ResetPasswordToken, Integer> {
   ResetPasswordToken findByEmail(String email);
   boolean existsByEmail(String email);
   void deleteByEmail(String email);
}
