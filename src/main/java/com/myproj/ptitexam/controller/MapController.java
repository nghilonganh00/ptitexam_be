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
}
