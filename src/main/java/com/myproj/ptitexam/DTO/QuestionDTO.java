package com.myproj.ptitexam.DTO;

import jakarta.persistence.*;


public class QuestionDTO {
    public Integer id;
    private String content;

    private String option1;

    private String option2;

    private String option3;

    private String option4;

    private String answer;
    private Integer exam_id;



   public int getExam_id() {
       return exam_id;
   }

   public void setExam_id(int exam_id) {
       this.exam_id = exam_id;
   }



    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getExamId(){
        return exam_id;
    }
    public  void setExamId(Integer examId){
        this.exam_id=examId;
    }

}