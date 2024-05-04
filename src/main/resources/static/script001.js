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
    window.location.href = "result001.html";
}
window.onload = function() {
    var fortyFiveMinutes = 60 * 45, // Thời gian là 45 phút
        display = document.querySelector('#time');
    timer = startTimer(fortyFiveMinutes, display); // Lưu định danh của bộ đếm thời gian
};
function check() {
    var userAnswers = [];
    var c = 0;
    var q1 = document.quiz.question1.value;
    var q2 = document.quiz.question2.value;
    var q3 = document.quiz.question3.value;
    var q4 = document.quiz.question4.value;
    var q5 = document.quiz.question5.value;
    var q6 = document.quiz.question6.value;
    var q7 = document.quiz.question7.value;
    var q8 = document.quiz.question8.value;
    var q9 = document.quiz.question9.value;
    var q10 = document.quiz.question10.value;
    userAnswers.push(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
    sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    if (q1 == 'option2') {c++}
    if (q2 == 'option3') {c++}
    if (q3 == 'option4') {c++}
    if (q4 == 'option2') {c++}
    if (q5 == 'option3') {c++}
    if (q6 == 'option4') {c++}
    if (q7 == 'option2') {c++}
    if (q8 == 'option3') {c++}
    if (q9 == 'option4') {c++}
    if (q10 == 'option2') {c++}
    return c;
}

function showResultPage() {
    var score = check(); // Gọi hàm check() để tính điểm
    sessionStorage.setItem('score', score); // Lưu điểm vào sessionStorage
    window.location.href = "result001.html"; // Chuyển hướng sang trang result.html
}
// Khai báo một mảng chứa các câu hỏi và phương án đã chọn
var answersData = [
    { question: "Câu hỏi 1: Thiết bị hub thông thường nằm ở tầng nào của mô hình OSI?", chosenOption: "option2", correctOption: "option2" },
    { question: "Câu hỏi 2: Thiết bị Switch thông thường nằm ở tầng nào của mô hình OSI?", chosenOption: "option3", correctOption: "option3" },
    { question: "Câu hỏi 3: Thiết bị Repeater nằm ở tầng nào của mô hình OSI?", chosenOption: "option4", correctOption: "option4" },
    { question: "Câu hỏi 4: Thiết bị Bridge nằm ở tầng nào của mô hình OSI?", chosenOption: "option2", correctOption: "option2" },
    { question: "Câu hỏi 5: Cáp UTP có thể kết nối tối đa bao nhiêu mét?", chosenOption: "option3", correctOption: "option3" },
    { question: "Câu hỏi 6: Mô tả nào thích hợp cho mạng Bus:", chosenOption: "option4", correctOption: "option4" },
    { question: "Câu hỏi 7: Môi trường truyền tin thông thường trong mạng máy tính là:", chosenOption: "option2", correctOption: "option2" },
    { question: "Câu hỏi 8: Các mạng máy tính được thiết kế và cài đặt theo quan điểm:", chosenOption: "option3", correctOption: "option3" },
    { question: "Câu hỏi 9: Đơn vị cơ bản đo tốc độ truyền dữ liệu là", chosenOption: "option4", correctOption: "option4" },
    { question: "Câu hỏi 10: Cáp UTP Cat5e sử dụng đầu nối", chosenOption: "option2", correctOption: "option2" },
];
function reviewAnswers() {
    
    var userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')); // Lấy các đáp án mà người dùng đã chọn từ sessionStorage

    var answersHTML = "<div class='question-container'><h3>Câu trả lời:</h3></div>";

    answersData.forEach(function(data, index) {
        answersHTML += "<div class='question-container'>";
        answersHTML += "<p>" + data.question + "</p>";

        ['option1', 'option2', 'option3', 'option4'].forEach(function(option) {
            answersHTML += "<label class='" + getClassForOption(data, option, userAnswers[index]) + "'>";
            answersHTML += "<input type='radio' disabled";
            if (userAnswers[index] === option) {
                answersHTML += " checked";
            }
            answersHTML += ">";
            answersHTML += getOptionText('question' + (index + 1), option);
            if (userAnswers[index] === option && userAnswers[index] !== data.correctOption) {
                answersHTML += "<span class='cross-mark'>&#10008;</span>";
            }
            answersHTML += "</label>";

        });

        answersHTML += "<p>Đáp án đúng: <span class='correct-answer'>" + getOptionText('question' + (index + 1), data.correctOption) + "</span></p>";
        answersHTML += "</div>";
    });

    document.getElementById('answers').innerHTML = answersHTML;
    var resultDiv = document.getElementById('answers');
    if (resultDiv.style.display !== 'none') {
        resultDiv.style.display = 'none';
    } else{
        resultDiv.style.display = 'flex';
    }
}
// Hàm trả về lớp CSS cho mỗi phương án
function getClassForOption(data, option) {
    if (data.chosenOption === option && data.chosenOption === data.correctOption) {
        return "correct-answer selected-answer";
    } else if (data.chosenOption === option) {
        return "selected-answer";
    } else if (option === data.correctOption) {
        return "correct-answer";
    } else {
        return "";
    }
}

// Hàm lấy văn bản của phương án đã chọn cho mỗi câu hỏi
function getOptionText(questionNumber, optionValue) {
    switch (questionNumber) {
        case "question1":
            switch (optionValue) {
                case "option1":
                    return "Tầng 1";
                case "option2":
                    return "Tầng 2";
                case "option3":
                    return "Tầng 3";
                case "option4":
                    return "Tầng 4";
                default:
                    return "Không chọn";
            }
        case "question2":
            switch (optionValue) {
                case "option1":
                    return "Tầng 1";
                case "option2":
                    return "Tầng 2";
                case "option3":
                    return "Tầng 3";
                case "option4":
                    return "Tầng 4";
                default:
                    return "Không chọn";
            }
        case "question3":
            switch (optionValue) {
                case "option1":
                    return "Tầng 1";
                case "option2":
                    return "Tầng 2";
                case "option3":
                    return "Tầng 3";
                case "option4":
                    return "Tầng 4";
                default:
                    return "Không chọn";
            }
        case "question4":
            switch (optionValue) {
                case "option1":
                    return "Tầng 1";
                case "option2":
                    return "Tầng 2";
                case "option3":
                    return "Tầng 3";
                case "option4":
                    return "Tầng 4";
                default:
                    return "Không chọn";
            }
        case "question5":
            switch (optionValue) {
                case "option1":
                    return "10";
                case "option2":
                    return "20";
                case "option3":
                    return "100";
                case "option4":
                    return "200";
                default:
                    return "Không chọn";
            }
        case "question6":
            switch (optionValue) {
                case "option1":
                    return "Cần nhiều cáp hơn các cấu hình khác";
                case "option2":
                    return "Phương tiện rẻ tiền và dễ sử dụng";
                case "option3":
                    return "Dễ sửa chữa hơn các cấu hình khác";
                case "option4":
                    return "Số lượng máy trên mạng không ảnh hưởng đến hiệu suất mạng";
                default:
                    return "Không chọn";
            }
        case "question7":
            switch (optionValue) {
                case "option1":
                    return "Các loại cáp như: đồng trục, xoắn đôi, Cáp quang, cáp điện thoại,...";
                case "option2":
                    return "Sóng điện từ,..";
                case "option3":
                    return "Cáp quang";
                case "option4":
                    return "Tất cả môi trường nêu trên";
                default:
                    return "Không chọn";
            }
        case "question8":
            switch (optionValue) {
                case "option1":
                    return "Có cấu trúc đa tầng";
                case "option2":
                    return "Nhiều tầng";
                case "option3":
                    return "Theo lớp";
                case "option4":
                    return "Tập hợp";
                default:
                    return "Không chọn";
            }
        case "question9":
            switch (optionValue) {
                case "option1":
                    return "Bit";
                case "option2":
                    return "Byte";
                case "option3":
                    return "Bps (bit per second)";
                case "option4":
                    return "Hz";
                default:
                    return "Không chọn";
            }
        case "question10":
            switch (optionValue) {
                case "option1":
                    return "RJ - 58";
                case "option2":
                    return "BNC";
                case "option3":
                    return "RJ - 45";
                case "option4":
                    return "ST";
                default:
                    return "Không chọn";
            }
        default:
            return "Không chọn";
    }
}


const redirectToNewPage = (new_page, paramName, paramValue) => {
    if (paramName !== undefined && paramValue !== undefined) {
      const encodedParamName = encodeURIComponent(paramName);
      const encodedParamValue = encodeURIComponent(paramValue);
  
      const separator = new_page.includes("?") ? "&" : "?";
  
      window.location.href = `${new_page}${separator}${encodedParamName}=${encodedParamValue}`;
    } else {
      window.location.href = new_page;
    }
  };

  function getClassForOption(data, option, userOption) {
    if (userOption === option && userOption === data.correctOption) {
        return "correct-answer selected-answer";
    } else if (userOption === option && userOption !== data.correctOption) {
        return "incorrect-answer selected-answer";
    } else if (option === data.correctOption) {
        return "correct-answer";
    } else {
        return "";
    }
}

