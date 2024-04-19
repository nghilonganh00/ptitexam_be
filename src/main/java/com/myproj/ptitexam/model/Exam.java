package com.myproj.ptitexam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "exam")

public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String examTitle;
    private String examDescription;
    private String startTime;
    private String endTime;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Question> listQuestion;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public List<Question> getListQuestion() {
        return listQuestion;
    }

    public void setListQuestion(List<Question> listQuestion) {
        this.listQuestion = listQuestion;
    }

    @Override
    public String toString() {
        return "Exam{" +
                "endTime='" + endTime + '\'' +
                ", startTime='" + startTime + '\'' +
                ", examDescription='" + examDescription + '\'' +
                ", examTitle='" + examTitle + '\'' +
                ", id=" + id +
                '}';
    }
}