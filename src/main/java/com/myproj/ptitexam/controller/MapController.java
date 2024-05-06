package com.myproj.ptitexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class MapController {
    @GetMapping("/login")
    public String loginPage(){
        return "index";
    }

    @RequestMapping("/signup")
    public String signupPage(){
        return "signup";
    }

    @GetMapping("/student")
    public String userPage(){
        return "user-main";
    }

    @GetMapping("/exams")
    public String examPage() {
        return "exam";
    }

    @GetMapping("/exams/:id")
    public String examManagePage() {
        return "manage-exam";
    }
    
    @GetMapping("/testxx")
    public String test(){
        return "create-exam";
    }
}
