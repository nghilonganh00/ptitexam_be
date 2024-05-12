var timer; // Biến để lưu định danh của bộ đếm thời gian

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval); // Dừng bộ đếm thời gian
            alert("Hết giờ!");
            alert("Bài của bạn đã được nộp") // Hiển thị thông báo khi hết giờ
            showResult(); // Hiển thị kết quả
        }
    }, 1000);

    return timerInterval; // Trả về định danh của bộ đếm thời gian
}

function submitQuiz() {
    clearInterval(timer); // Dừng bộ đếm thời gian
    alert("Bài của bạn đã được nộp!"); // Hiển thị thông báo sau khi nộp bài
    document.querySelector('.button button').style.display = 'none';
    showResult(); // Hiển thị kết quả
}

function showResult() {
    document.getElementById('resultBtn').style.display = 'block'; // Hiển thị nút kết quả
}

function showResultPage() {
    window.location.href = "result001";
}
window.onload = function() {
    var fortyFiveMinutes = 60 * 45, // Thời gian là 45 phút
        display = document.querySelector('#time');
    timer = startTimer(fortyFiveMinutes, display); // Lưu định danh của bộ đếm thời gian
};











// Lấy token từ tệp JSON
//const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dTEyMyIsImlhdCI6MTcxNTQzNjI5MiwiZXhwIjoxNzE1NDM5ODkyfQ.Nx2pjXtGpzIJh9nN74slmaxpPZFp7tFIGHfXpvX97dc";
const jwt = localStorage.getItem("jwt")



// Hàm để xóa tất cả các câu hỏi hiện có trong form
function clearQuizForm() {
    const quizForm = document.getElementById('quiz');
    quizForm.innerHTML = ''; // Xóa hết nội dung trong form
}

// Hàm để thêm câu hỏi vào form
function addQuestionsToForm(questions) {
    // Xóa tất cả các câu hỏi hiện có trong form
    //clearQuizForm();

    // Lặp qua mỗi câu hỏi trong dữ liệu và thêm chúng vào form
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = 'Câu hỏi ' + (index + 1) + ': ' + question.content;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        for (let i = 1; i <= 4; i++) {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question' + (index + 1);
            optionInput.value = 'option' + i;
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(question['option' + i]));
            optionsDiv.appendChild(optionLabel);
            optionsDiv.appendChild(document.createElement('br'));
        }
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(optionsDiv);
        document.getElementById('quiz').appendChild(questionDiv);
    });

    // Sau khi tạo xong các câu hỏi, thêm thời gian và nút nộp bài
    const quizForm = document.getElementById('quiz');
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button';
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Nộp bài';
    submitButton.onclick = submitQuiz;
    buttonDiv.appendChild(submitButton);
    quizForm.appendChild(buttonDiv);

    const resultButton = document.createElement('button');
    resultButton.id = 'resultBtn';
    resultButton.style.display = 'none';
    resultButton.type = 'button';
    resultButton.textContent = 'Xem Kết Quả';
    resultButton.onclick = showResultPage;
    quizForm.appendChild(resultButton);

    // Bắt đầu bộ đếm thời gian
    const fortyFiveMinutes = 60 * 45; // Thời gian là 45 phút
    const display = document.querySelector('#time');
    timer = startTimer(fortyFiveMinutes, display); // Lưu định danh của bộ đếm thời gian
}
// Fetch dữ liệu từ server và hiển thị các câu hỏi
fetch('http://localhost:8080/exam/getExam?exam_id=303&user_id=3', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${jwt}`, // Thêm jwt vào header Authorization
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    addQuestionsToForm(data.question);
})
.catch(error => {
    console.error('Error:', error);
});













// Biến lưu trữ dữ liệu câu hỏi từ server
var answersData;

// Fetch dữ liệu từ server và hiển thị kết quả
fetch('http://localhost:8080/exam/review?resultId=252', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Lưu dữ liệu vào biến answersData
    answersData = data;
    // Gọi hàm reviewAnswers sau khi dữ liệu đã được nhận
    reviewAnswers();
})
.catch(error => {
    console.error('Error:', error);
});

// Hàm xem đáp án
function reviewAnswers() {
    if (typeof answersData === 'undefined' || answersData.length === 0) {
        console.error("No data available.");
        return;
    }

    var answersHTML = "<div class='question-container'><h3>Câu trả lời:</h3></div>";

    answersData.forEach(function(data, index) {
        answersHTML += "<div class='question-container'>";
        answersHTML += 'Câu ' + (index + 1) + ': <span>' + data.questionTitle + '</span>';


        ['option1', 'option2', 'option3', 'option4'].forEach(function(option) {
            answersHTML += "<label class='" + getClassForOption(data, option, data.userAnswer) + "'>";
            answersHTML += "<input type='radio' disabled";
            if (data.userAnswer === data[option]) {
                answersHTML += " checked";
            }
            answersHTML += ">";
            answersHTML += data[option];
            if (data.userAnswer === data[option] && data.userAnswer === data.rightAnswer) {
                answersHTML += "<span class='check-mark'>&#10004;</span>";
            } else if (data.userAnswer === data[option] && data.userAnswer !== data.rightAnswer) {
                answersHTML += "<span class='cross-mark'>&#10008;</span>";
            }
            answersHTML += "</label>";
        });

        // Sửa đoạn này để truy cập vào data.rightAnswer trực tiếp
        answersHTML += "<p>Đáp án đúng: <span class='correct-answer'>" + data.rightAnswer + "</span></p>";
        answersHTML += "</div>";
    });

    document.getElementById('answers').innerHTML = answersHTML;
    var resultDiv = document.getElementById('answers');
    if (resultDiv.style.display !== 'none') {
        resultDiv.style.display = 'none';
    } else {
        resultDiv.style.display = 'flex';
    }
}


// Hàm trả về lớp CSS cho mỗi phương án
function getClassForOption(data, option, userOption) {
    if (userOption === option && userOption === data.rightAnswer) {
        return "correct-answer selected-answer";
    } else if (userOption === option && userOption !== data.rightAnswer) {
        return "incorrect-answer selected-answer";
    } else if (option === data.rightAnswer) {
        return "correct-answer";
    } else {
        return "";
    }
}











window.onload = function() {
    // Fetch API để lấy dữ liệu từ backend
    fetch('http://localhost:8080/user/getResult?user_id=3', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Lấy điểm số và số câu trả lời đúng từ đối tượng JSON
        var score = data.score;
        var correctCnt = data.correctCnt;

        // Hiển thị điểm số và số câu trả lời đúng trên giao diện
        var scoreElement = document.getElementById('score');
        if (scoreElement) {
            var totalQuestions = 4; // Tổng số câu hỏi
            let result = score * 10 / totalQuestions;
            scoreElement.innerText = "Số câu đúng: " + correctCnt + "/" + totalQuestions; // Hiển thị số câu đúng / tổng số câu hỏi
            document.getElementById('result').innerText = "Điểm: " + result; // Hiển thị điểm
        } else {
            console.error("Element with id 'score' not found!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
