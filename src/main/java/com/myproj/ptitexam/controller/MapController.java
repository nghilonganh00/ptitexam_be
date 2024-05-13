package com.myproj.ptitexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class MapController {
    @GetMapping("/student")
    public String loginPage(){
        return "index";
    }

    @GetMapping("/signup")
    public String signupPage(){
        return "signup";
    }

    @GetMapping("/student/exam")
    public String userPage(){
        return "user-main";
    }


    @GetMapping("/exam-admin")
    public String examPage() {
        return "exam";
    }

    @GetMapping("/exam-admin/manage")
    public String examManagePage() {
        return "manage-exam";
    }

    @GetMapping("/exam-admin/create")
    public String addExamPage() {
        return "create-exam";
    }
    
    @GetMapping("/admin")
    public String adminLogin(){
        return "admin-login";
    }
    @GetMapping("/student/startExam")
    public String doExamPage(){
        return "index001";
    }
    @GetMapping("/student/result001")
    public String Resultpage(){
        return "result001";
    }
    @GetMapping("/testxx")
    public String test(){
        return "create-exam";
    }
    @GetMapping("/statistic")
    public String statisticPage(){
        return "statistic";
    }

    @GetMapping("/acc_manager")
    public String accManager(){
        return "acc_manager";
    }

    @GetMapping("/exam_result")
    public String examResultPage(){
        return "kqbaithi";
    }
    @GetMapping("/recovery")
    public String recovery(){
        return "forgotPassword";
    }
    @GetMapping("set-password")
    public String resetPass(){
        return "resetPass";
    }

    @GetMapping("/student/result")
    public String studentResult(){
        return "result001";
    }
}



