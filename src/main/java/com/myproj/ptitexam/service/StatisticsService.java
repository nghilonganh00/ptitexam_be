package com.myproj.ptitexam.service;

import com.myproj.ptitexam.dao.ExamDao;
import com.myproj.ptitexam.dao.ExamResultDao;
import com.myproj.ptitexam.model.Exam;
import com.myproj.ptitexam.model.ExamResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StatisticsService {
    @Autowired
    ExamDao examDao;
    @Autowired
    ExamResultDao examResultDao;
    //Pho diem 0-4  4-6.5 6.5-8 8-9 9-10
    public ResponseEntity<?> getScoreDistribution(Integer examId) {
        try{
            Exam exam = examDao.findById(examId).orElseThrow(() -> new Exception());
            List<ExamResult> listResult = examResultDao.findByExam(exam);
            if(listResult.isEmpty()){
                return new ResponseEntity<String>("No one have done this exam", HttpStatus.OK);
            }

            int [] scoreArr={0,0,0,0,0};
            for(ExamResult result:listResult){
                if(result.getScore() <=4)
                    scoreArr[0]++;
                else if(result.getScore() <=6.5)
                    scoreArr[1]++;
                else if(result.getScore() <=8)
                    scoreArr[2]++;
                else if(result.getScore() <=9)
                    scoreArr[3]++;
                else
                    scoreArr[4]++;
            }
            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("0-4", scoreArr[0]);
            responseData.put("4-6.5", scoreArr[1]);
            responseData.put("6.5-8", scoreArr[2]);
            responseData.put("8-9", scoreArr[3]);
            responseData.put("9-10", scoreArr[4]);
            return new ResponseEntity<Object>(responseData, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("Exam not found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getNumberOfParticipants(Integer examId) {
        try{
                Exam exam = examDao.findById(examId).orElseThrow(() -> new Exception());
                List<ExamResult> listResult = examResultDao.findByExam(exam);
                return new ResponseEntity<Integer>(listResult.size(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("Exam not found", HttpStatus.NOT_FOUND);
        }

    }
    public ResponseEntity<?> getAverageScore(Integer examId) {
        try{
            Exam exam = examDao.findById(examId).orElseThrow(() -> new Exception());
            List<ExamResult> listResult = examResultDao.findByExam(exam);

            if(listResult.isEmpty()){
                return new ResponseEntity<Double>(0.0, HttpStatus.OK);
            }
            Double sum = 0.0;
            for(ExamResult result:listResult){
                sum+= (Double) result.getScore();
            }
            Double returnResult= sum/listResult.size();
            return new ResponseEntity<Double>(returnResult, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("Exam not found", HttpStatus.NOT_FOUND);
        }

    }
    public ResponseEntity<?> getInfoOfAllExam(){
        List<Exam> examList= examDao.findAll();
        List<Object> returnList= new ArrayList<>();
        for(Exam exam:examList){
            ResponseEntity<?> avgScore= getAverageScore(exam.getId());
            ResponseEntity<?> participants= getNumberOfParticipants(exam.getId());
            Map<String, Object> temp = new LinkedHashMap<>();
            temp.put("examId", exam.getId());
            temp.put("examTitle", exam.getExamTitle());
            temp.put("totalTakenTime", participants.getBody());
            temp.put("averageScore",avgScore.getBody());
            returnList.add(temp);
        }
        return new ResponseEntity<Object>(returnList,HttpStatus.OK);
    }

}
