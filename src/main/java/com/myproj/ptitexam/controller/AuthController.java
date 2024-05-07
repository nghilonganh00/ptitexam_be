package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.DTO.LoginDTO;
import com.myproj.ptitexam.DTO.RegisterDTO;
import com.myproj.ptitexam.dao.RoleDao;
import com.myproj.ptitexam.dao.UserDao;
import com.myproj.ptitexam.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/read-spring-cookie")
    public String readCookie(
            @CookieValue(name = "jwt", defaultValue = "") String jwt) {
        return jwt;
    }

    @GetMapping("forgot-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email) {
        return authService.forgetPassword(email);
    }

    // @GetMapping("set-password")
    // public ResponseEntity<String> setPassword(@RequestParam String email, @RequestParam String token, @RequestParam String newPassword) {
    //     return authService.setPassword(email, token, newPassword);
    // }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestParam String token, @RequestParam String newPassword) {
        return authService.setPassword(email, token, newPassword);
    }
}

