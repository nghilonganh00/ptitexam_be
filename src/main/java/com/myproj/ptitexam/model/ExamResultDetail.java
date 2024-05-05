package com.myproj.ptitexam.model;

import jakarta.persistence.*;

@Entity
@IdClass(ExamResultDetailId.class)
@Table(name="take_exam_question")
public class ExamResultDetail {
    @Id
    @ManyToOne
    @JoinColumn(name="take_exam_id", nullable = false, referencedColumnName = "id")
    private ExamResult examResult;
    @Id
    @ManyToOne
    @JoinColumn(name="question_id", nullable = false, referencedColumnName = "id")
    private Question question;
    @Column(name="answer")
    private String answer;

    public ExamResultDetail() {
    }

    public ExamResultDetail(ExamResult examResultId, Question questionId, String answer) {
        this.examResult = examResultId;
        this.question = questionId;
        this.answer = answer;
    }

    public ExamResult getExamResult() {
        return examResult;
    }

    public void setExamResult(ExamResult examResult) {
        this.examResult = examResult;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
