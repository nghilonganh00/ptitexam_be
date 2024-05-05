package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.DTO.LoginDTO;
import com.myproj.ptitexam.DTO.RegisterDTO;
import com.myproj.ptitexam.dao.RoleDao;
import com.myproj.ptitexam.dao.UserDao;
import com.myproj.ptitexam.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
   @Autowired
    AuthService authService;

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO){
        return authService.register(registerDTO);
    }
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        return authService.login(loginDTO);
    }

    @PutMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        return authService.forgotPassword(email);
    }

    @PutMapping("set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestParam String newPassword, @RequestParam String token) {
        return authService.setPassword(email, newPassword, token);
    }
}
