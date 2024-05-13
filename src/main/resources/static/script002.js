const jwt = localStorage.getItem('jwt');


window.onload = async function() {
    loadResult();
};



async function loadResult() {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        };
        var param = window.location.search;
        const response = await fetch("http://localhost:8080/exam/resultDetail"+param,requestOptions)
        if(!response.ok){
            window.location.href="/student/exam"
        }
        else{
        document.getElementById('userResultDetail').style.display="block";
        var json = await response.json();
        document.getElementById("examInfo").innerHTML=`<h2>${json.exam}</h2>
        <div id="score">Điểm số: ${json.score.toFixed(2)}</div>
        <div id="submitTime" style="display: flex; align-items: center; justify-content: center;">Thời gian nộp bài: ${timeFormat(json.endTime)}</div>`
        }
        var asnswerList=json.details;
        console.log(asnswerList);
        var out="";
        for(answer of asnswerList){
            var question=answer.question;

            out+=`
            <div class="question-container">
            <p>${answer.questionTitle}</p>
            `
            var op1 = `<label ><input type="radio" disabled="">${answer.option1}</label>`;
            var op2 = `<label ><input type="radio" disabled="" >${answer.option2}</label>`;
            var op3 = `<label ><input type="radio" disabled="">${answer.option3}</label>`;
            var op4 = `<label><input type="radio" disabled="">${answer.option4}</label>`;
            var check = (answer.userAnswer === answer.rightAnswer);
            switch (answer.userAnswer) {
                case answer.option1:
                    op1 = `<label style="color: red;   font-weight: bold;"><input type="radio" disabled=""  checked>${answer.option1}</label>`;
                    if(check)
                        op1 = `<label style="color: green;   font-weight: bold;"><input type="radio" disabled=""  checked>${answer.option1}</label>`;
                    break
                case answer.option2:
                    op2 = `<label style="color: red;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option2}</label>`;
                    if(check)
                        op2 = `<label style="color: green;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option2}</label>`;
                    break
                case answer.option3:
                    op3 = `<label style="color: red;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option3}</label>`;
                    if(check)
                        op3 = `<label style="color: green;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option3}</label>`;
                    break
                case answer.option4:
                    op4 =   `<label style="color: red;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option4}</label>`;
                    if(check)
                        op4 =   `<label style="color: green;   font-weight: bold;"><input type="radio" disabled="" checked>${answer.option4}</label>`;
                    break
            }
            out += op1+op2+op3+op4+`<p>Đáp án đúng: <span class="correct-answer">${answer.rightAnswer}</span></p></div> `;
        }
        document.getElementById("out").innerHTML+=out;
    } catch (error) {
        console.error(error);
    }

}


function timeFormat(time){
    var d = new Date(time);
    let a = d.toTimeString().substring(0,8)+" " + d.getDate().toString()+ "/" +(d.getMonth()+1).toString()+"/" + d.getFullYear().toString();
    return a;
}

