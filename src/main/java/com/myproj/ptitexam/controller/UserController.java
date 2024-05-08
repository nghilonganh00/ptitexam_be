package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.DTO.ExamResultDTO;
import com.myproj.ptitexam.DTO.addUserRequest;
import com.myproj.ptitexam.model.ExamResult;
import com.myproj.ptitexam.model.User;
import com.myproj.ptitexam.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addUser(@RequestBody addUserRequest user) {
        return userService.addUser(user);
    }



    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
     public ResponseEntity<?> getAllUser() {
       return userService.getAllUser();
    }

    @GetMapping("/getByUsernameContaining")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<java.util.List<User>> getByUsernameContaining(@RequestBody String username) {
       return userService.getByUsernameContaining(username);
    }

    @PutMapping("edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> editUser(@RequestParam Integer userId, @RequestBody addUserRequest updatedUser) {
        return userService.editUser(userId, updatedUser);
    }
    
    @DeleteMapping("delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@RequestParam Integer userId) {
        return userService.deleteUser(userId);
    }

    @GetMapping("getResult")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserResult(@RequestParam int user_id){
        return userService.getUserResult(user_id);
    }


}
