package com.myproj.ptitexam.controller;

import com.myproj.ptitexam.service.StatisticsService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getNumberOfParticipants(@RequestParam Integer exam_id){
        return statisticsService.getNumberOfParticipants(exam_id);
    }

    @GetMapping("avgscore")
    public ResponseEntity<?> getAverageScore(@RequestParam Integer exam_id){
        return  statisticsService.getAverageScore(exam_id);
    }

    @GetMapping("scoreDistribution")
    public ResponseEntity<?> getScoreDistribution(@RequestParam Integer exam_id){
        return statisticsService.getScoreDistribution(exam_id);
    }
    @GetMapping("")
    public ResponseEntity<?> getInfoOfAllExam(){
        return statisticsService.getInfoOfAllExam();
    }

}
