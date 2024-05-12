package com.myproj.ptitexam.DTO;

import java.util.List;

public class StartExamResponse {
    private Integer takeId;
    private List<QuestionInExam> question;

    public StartExamResponse(Integer takeId, List<QuestionInExam> question) {
        this.takeId = takeId;
        this.question = question;
    }

    public Integer getTakeId() {
        return takeId;
    }

    public void setTakeId(Integer takeId) {
        this.takeId = takeId;
    }

    public List<QuestionInExam> getQuestion() {
        return question;
    }

    public void setQuestion(List<QuestionInExam> question) {
        this.question = question;
    }
}
