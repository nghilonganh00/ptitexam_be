package com.myproj.ptitexam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproj.ptitexam.model.User;
import java.util.List;
import java.util.Optional;


public interface UserDao extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    List<User> findByUsernameContaining(String username);
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

}
