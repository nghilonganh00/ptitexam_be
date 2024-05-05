package com.myproj.ptitexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MapController {
    @GetMapping("/login")
    public String homePage(){
        return "index";
    }

    @RequestMapping("/signup")
    public String signupPage(){
        return "signup";
    }

    @RequestMapping("/admin-login.html")
    public String adminLoginPage(){
        return "admin-login";
    }

    @RequestMapping("/user-main.html")
    public String usermain(){
        return "user-main";
    }

    @RequestMapping("/exam.html")
    public String exam(){
        return "exam";
    }

    @RequestMapping("/acc_manager.html")
    public String acc_manager(){
        return "acc_manager";
    }


}
