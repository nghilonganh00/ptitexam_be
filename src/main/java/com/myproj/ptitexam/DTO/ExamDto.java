package com.myproj.ptitexam.DTO;

import com.myproj.ptitexam.model.Question;

import java.sql.Timestamp;
import java.util.List;

public class ExamDto {
    private String examTitle;
    private String examDescription;
    private String startTime;
    private String endTime;
    List<Question> questionList;

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getExamDescription() {
        return examDescription;
    }

    public void setExamDescription(String examDescription) {
        this.examDescription = examDescription;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public List<Question> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Question> questionList) {
        this.questionList = questionList;
    }

    @Override
    public String toString() {
        return "ExamDto{" +
                "examTitle='" + examTitle + '\'' +
                ", examDescription='" + examDescription + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", questionList=" + questionList +
                '}';
    }
}
