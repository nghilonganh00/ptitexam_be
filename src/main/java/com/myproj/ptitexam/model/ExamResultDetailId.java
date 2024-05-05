package com.myproj.ptitexam.model;

import java.io.Serializable;

public class ExamResultDetailId implements Serializable {
    private ExamResult examResult;
    private Question question;

    public ExamResultDetailId() {
    }

    public ExamResultDetailId(ExamResult examResultId, Question questionId) {
        this.examResult = examResultId;
        this.question = questionId;
    }
}
