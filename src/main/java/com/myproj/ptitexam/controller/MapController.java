package com.myproj.ptitexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping("/admin")
    public String adminLogin(){
        return "admin-login";
    }
    @GetMapping("/startExam")
    public String doExamPage(){
        return "index001";
    }
    @GetMapping("/testxx")
    public String test(){
        return "create-exam";
    }
    @GetMapping("/statistic")
    public String statisticPage(){
        return "statistic";
    }
}