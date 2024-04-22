package com.myproj.ptitexam.dao;

import com.myproj.ptitexam.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleDao extends JpaRepository<Roles,Integer> {
    Optional<Roles> findByName(String name);
}
