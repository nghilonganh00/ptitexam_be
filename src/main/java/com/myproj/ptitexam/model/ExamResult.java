package com.myproj.ptitexam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "take_exam")
public class ExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @Column(name = "score")
    private double score;

    @Column(name="start_time")
    private Timestamp startTime;
    @Column(name="end_time")
    private Timestamp endTime;

    @ManyToOne
    @JoinColumn(name="exam_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private Exam exam;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }
}
