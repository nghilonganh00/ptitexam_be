package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.model.ExamResult;
import com.myproj.ptitexam.model.User;
import com.myproj.ptitexam.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody User user) {
        return userService.signupUser(user);
    }

    @GetMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestParam String email, @RequestParam String password) {
       return userService.login(email, password);
    }

    @GetMapping("/getAll")
     public ResponseEntity<List<User>> getAllUser() {
       return userService.getAllUser();
    }

    @GetMapping("/getByUsernameContaining")
    public ResponseEntity<java.util.List<User>> getByUsernameContaining(@RequestBody String username) {
       return userService.getByUsernameContaining(username);
    }

    @PutMapping("edit/{userId}")
    public ResponseEntity<String> editUser(@PathVariable Integer userId, @RequestBody User updatedUser) {
        return userService.editUser(userId, updatedUser);
    }
    
    @DeleteMapping("delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
        return userService.deleteUser(userId);
    }

    @GetMapping("getResult")
    public ResponseEntity<List<ExamResult>> getUserResult(){
        return userService.getUserResult();
    }
}
