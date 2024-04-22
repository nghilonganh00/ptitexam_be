package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.service.StatisticsService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("statistic")


public class StatisticsController {
    @Autowired
    StatisticsService statisticsService;
    @GetMapping("participants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getNumberOfParticipants(@RequestParam Integer exam_id){
        return statisticsService.getNumberOfParticipants(exam_id);
    }

    @GetMapping("avgscore")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAverageScore(@RequestParam Integer exam_id){
        return  statisticsService.getAverageScore(exam_id);
    }

    @GetMapping("scoreDistribution")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getScoreDistribution(@RequestParam Integer exam_id){
        return statisticsService.getScoreDistribution(exam_id);
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getInfoOfAllExam(){
        return statisticsService.getInfoOfAllExam();
    }

}
