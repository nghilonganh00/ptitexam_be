var fullName = localStorage.getItem('fullName')
var ExamResultId = localStorage.getItem('ExamResultId')
var ExamId = localStorage.getItem('ExamId')
var ExamTitle = localStorage.getItem('ExamTitle')
var username = localStorage.getItem('username')
var score = localStorage.getItem('score')
window.addEventListener("DOMContentLoaded", function () {

    var hotenkq = document.getElementById("hotenkq")
    var msvkq = document.getElementById("msvkq")
    var hoten = document.createElement('p')
    hoten.textContent = fullName
    var msv = document.createElement('p')
    msv.textContent = username

    hotenkq.appendChild(hoten)
    msvkq.appendChild(msv)

    var scorebox = document.getElementById("score")
    var scorebox1 = document.createElement('p')
    scorebox1.textContent = score
    scorebox.appendChild(scorebox1)

})
const jwt = localStorage.getItem('jwt')
//
function question(e, i) {
    let sa = '', sb = '', sc = '', sd = ''
    let sa1 = '', sb1 = '', sc1 = '', sd1 = ''
    switch (e.userAnswer) {
        case 'A':
            sa = 'id="true"'
            break
        case 'B':
            sb = 'id="true"'
            break
        case 'C':
            sc = 'id="true"'
            break
        case 'D':
            sd = 'id="true"'
            break
    }
    switch (e.rightAnswer) {
        case 'A':
            sa1 = 'id="selected"'
            break
        case 'B':
            sb1 = 'id="selected"'
            break
        case 'C':
            sc1 = 'id="selected"'
            break
        case 'D':
            sd1 = 'id="selected"'
            break
    }
    if (e.userAnswer !== e.rightAnswer) {

        return `<div class="box" id="question">
                                                <p style="margin: 5px;">Câu ${i + 1}: ${e.questionTitle}</p>
                                                <div class="box answer" ${sa}  ${sa1}>A. ${e.option1}</div>
                                                <div class="box answer"  ${sb}  ${sb1}>B. ${e.option2} </div>
                                                <div class="box answer"   ${sc} ${sc1}>C. ${e.option3} </div>
                                                <div class="box answer"  ${sd} ${sd1}>D. ${e.option4} </div>
                                            </div>`
    }
    else {
        return `<div class="box" id="question">
                                                    <p style="margin: 5px;">Câu ${i + 1}: ${e.questionTitle}</p>
                                                    <div class="box answer" ${sa}  >A. ${e.option1}</div>
                                                    <div class="box answer"  ${sb}  >B. ${e.option2} </div>
                                                    <div class="box answer"   ${sc} >C. ${e.option3} </div>
                                                    <div class="box answer"  ${sd} >D. ${e.option4} </div>
                                                </div>`
    }

}
var s = `<div style="margin: 20px;font-size: 30px;">Kết quả ${ExamTitle}</div>`
const answer_container = document.getElementById("answer_container")
$.ajax({
    url: '/exam/review?resultId=' + ExamResultId,
    type: 'GET',
    headers: {
        'Authorization': `Bearer ${jwt}`
    },
    success: (data) => {
        data.map((e, i) => {
            s += question(e, i)
        })
        answer_container.innerHTML = s
    }
})



function trove() {
    window.location.href = './acc_manager'
}