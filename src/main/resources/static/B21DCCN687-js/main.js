let questionIndex = 0;
let listQuestion = [];

let listExams = [];

let listAddQuestion = [];

const timestampToDate = (timestamp) => {
  let date = new Date(timestamp);

  let year = date.getUTCFullYear();
  let month = String(date.getUTCMonth() + 1).padStart(2, "0");
  let day = String(date.getUTCDate()).padStart(2, "0");

  let formattedDateString = `${day}-${month}-${year}`;

  return formattedDateString;
};

const createTimestamp = (hourTime, dateTime) => {
  const [year, month, day] = dateTime.split("-");
  const [hours, minutes] = hourTime.split(":");

  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};

const compareDates = (dateStr1, dateStr2) => {
  const [date1, time1] = dateStr1.split(" ");
  const [date2, time2] = dateStr2.split(" ");

  const [hour1, minute1, s1] = time1.split(":").map(Number);
  const [hour2, minute2, s2] = time2.split(":").map(Number);

  const [year1, month1, day1] = date1.split("-").map(Number);
  const [year2, month2, day2] = date2.split("-").map(Number);

  console.log(year1 + " " + month1 + " " + day1);
  console.log(year2 + " " + month2 + " " + day2);

  const n1 =
    year1 * 100000000 + month1 * 1000000 + day1 * 10000 + hour1 * 100 + minute1;
  const n2 =
    year2 * 100000000 + month2 * 1000000 + day2 * 10000 + hour2 * 100 + minute2;

  if (n1 >= n2) {
    return false;
  }

  return true;
};

const ExamAPI = {
  getAll: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(
        "http://localhost:8080/exam/getAllExams",
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getById: async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(
        "http://localhost:8080/exam/getAllExams",
        requestOptions
      );
      const data = await response.json();
      const exam = data.find((exam) => exam.id === id);
      return exam;
    } catch (error) {
      console.error(error);
    }
  },
  getDetailById: async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(
        `http://localhost:8080/exam?exam_id=${id}`,
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  add: async (examTitle, examDescription, startTime, endTime, questionList) => {
    const jwt = localStorage.getItem("jwt");

    const newExam = {
      examTitle,
      examDescription,
      startTime,
      endTime,
      questionList,
    };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(newExam),
      };
      const response = await fetch(
        "http://localhost:8080/exam/createExam",
        requestOptions
      );
    } catch (error) {
      console.error(error);
    }
  },
  edit: async (examId, examTitle, examDescription, startTime, endTime) => {
    console.log("edit: ", startTime);
    try {
      const jwt = localStorage.getItem("jwt");
      const exam = await ExamAPI.getDetailById(examId);
      const questionListWithoutId = exam.questionList.map((question) => {
        const { id, ...questionWithoutId } = question;
        questionWithoutId["exam"] = {};
        return questionWithoutId;
      });

      const queryParams = new URLSearchParams({
        examId: parseInt(examId),
      });

      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          examTitle,
          examDescription,
          startTime: startTime,
          endTime: endTime,
          questionList: questionListWithoutId,
        }),
      };

      console.log(requestOptions.body);

      const response = await fetch(
        `http://localhost:8080/exam/edit?${queryParams}`,
        requestOptions
      );
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (examId) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };

      const response = await fetch(
        `http://localhost:8080/exam/delete?examId=${examId}`,
        requestOptions
      );
    } catch (error) {
      console.error(error);
    }
  },
};

const QuestionAPI = {
  add: async (content, option1, option2, option3, option4, answer, exam_id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          content,
          option1,
          option2,
          option3,
          option4,
          answer,
          exam_id,
        }),
      };
      const response = await fetch(
        "http://localhost:8080/question/create",
        requestOptions
      );
      const data = await response.json();
      const exam = data.filter((exam) => exam.id === id);
      return exam[0];
    } catch (error) {
      console.error(error);
    }
  },
  edit: async (
    id,
    content,
    option1,
    option2,
    option3,
    option4,
    answer,
    exam_id
  ) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          content: content,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          answer: answer,
          exam_id: exam_id,
        }),
      };
      const response = await fetch(
        `http://localhost:8080/question/edit/${id}`,
        requestOptions
      );
      // const data = await response.json();

      // return data;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(
        `http://localhost:8080/question/delete/${id}`,
        requestOptions
      );
      // const data = await response.json();

      // return data;
    } catch (error) {
      console.error(error);
    }
  },
};

const covertTimestampToString = (timestamp) => {
  const defaultDate = new Date(timestamp);

  const hours = defaultDate.getHours().toString().padStart(2, "0");
  const minutes = defaultDate.getMinutes().toString().padStart(2, "0");
  const day = defaultDate.getDate().toString().padStart(2, "0");
  const month = (defaultDate.getMonth() + 1).toString().padStart(2, "0");
  const year = defaultDate.getFullYear();

  return (newDate =
    hours + ":" + minutes + " " + day + "/" + month + "/" + year);
};

const normalizeString = (inputString) => {
  let normalizedString = inputString;
  normalizedString = normalizedString.trim();
  normalizedString = normalizedString.replace(/\s+/g, " ");
  return normalizedString;
};

const reverseDateFormat = (inputDate) => {
  let dateParts = inputDate.split("-");
  dateParts.reverse();
  let reversedDate = dateParts.join("/");
  return reversedDate;
};

const scrollIntoView = (event, targetElementId) => {
  event.preventDefault();
  const targetElement = document.getElementById(targetElementId);
  // console.log("scrollIntoView");
  targetElement.scrollIntoView();
};

const getListExam = () => {
  // return window.localStorage.get("list-exam");
};

const setListExam = (newListExam) => {
  // window.localStorage.setItem("list-exam", JSON.stringify(newListExam));
};

// let listExam = JSON.parse(window.localStorage.getItem("list-exam"));

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

//Exam
const searchExam = (searchKey) => {
  searchKey = searchKey.toLowerCase().trim();

  if (searchKey === "") {
    loadExamPage(listExams);
    return;
  }

  const listFilteredExam = listExams.filter((exam) =>
    exam.examTitle.toLowerCase().includes(searchKey)
  );
  loadExamPage(listFilteredExam);
};

//Edit  page
const closePopUp = () => {
  document.getElementById("popup").style["display"] = "none";
};

const openPopUp = (
  questionOrder,
  content,
  option1,
  option2,
  option3,
  option4,
  answer,
  questionId
) => {
  document.getElementById("popup").style["display"] = "block";

  //Chèn câu hỏi
  document.getElementById("edit-id-question").innerText = questionOrder;
  document.getElementById("edit-topic-input").value = content;
  document.getElementById("edit-answer-a-input").value = option1;
  document.getElementById("edit-answer-b-input").value = option2;
  document.getElementById("edit-answer-c-input").value = option3;
  document.getElementById("edit-answer-d-input").value = option4;

  //Thêm onclick cho 2 button xóa và lưu
  document.getElementById("popup-del-question").onclick = function () {
    delQuestion(questionId);
  };
  document.getElementById("popup-save-question").onclick = function () {
    saveQuestion(questionId);
  };
  const radioInputs = document.getElementsByName("edit-answer");
  radioInputs[0].value = option1;
  radioInputs[1].value = option2;
  radioInputs[2].value = option3;
  radioInputs[3].value = option4;

  if (radioInputs[0].value === answer) radioInputs[0].checked = true;
  else if (radioInputs[1].value === answer) radioInputs[1].checked = true;
  else if (radioInputs[2].value === answer) radioInputs[2].checked = true;
  else if (radioInputs[3].value === answer) radioInputs[3].checked = true;

  console.log(radioInputs[0].value + " " + answer);
};

//General edit page

const closeGeneralPopUp = () => {
  document.getElementById("general-popup").style["display"] = "none";
};

const openGeneralPopup = async () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  const exam = await ExamAPI.getDetailById(examId);
  const { examTitle, startTime, endTime, examDescription } = exam;

  document.getElementById("general-popup").style["display"] = "block";

  document.getElementById("popup-general-name").value = examTitle;

  console.log("start time: ", startTime);
  console.log("end time: ", endTime);

  if (startTime && endTime) {
    const start_parts = startTime.split(" ");
    document.getElementById("popup-general-start-time").value = start_parts[1];
    document.getElementById("popup-general-start-day").value = start_parts[0];

    const end_parts = endTime.split(" ");
    document.getElementById("popup-general-end-time").value = end_parts[1];
    document.getElementById("popup-general-end-day").value = end_parts[0];

    document.getElementById("exam-type").value = "Thời gian cố định";
  } else {
    document.getElementById("exam-type").value = "Tự do";
    onChangeExamType();
  }

  document.getElementById("popup-general-description").value = examDescription;
};

const saveGeneralPopup = async () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  const examTitle = normalizeString(
    document.getElementById("popup-general-name").value
  );

  let startHour = null,
    startDay = null,
    endHour = null,
    endDay = null,
    startTime = null,
    endTime = null;
  const examType = document.getElementById("exam-type").value;
  console.log("exam type: ", examType);
  if (examType === "Thời gian cố định") {
    if (startTime === "") {
      document.getElementById("popup-general-start-time").focus();
      return;
    } else if (endTime === "") {
      document.getElementById("popup-general-end-time").focus();
      return;
    }
    startHour = document.getElementById("popup-general-start-time").value;
    startDay = document.getElementById("popup-general-start-day").value;
    endHour = document.getElementById("popup-general-end-time").value;
    endDay = document.getElementById("popup-general-end-day").value;
    startTime = createTimestamp(startHour, startDay);
    endTime = createTimestamp(endHour, endDay);

    if (startDay === "") {
      document.getElementById("popup-general-start-day").focus();
      return;
    } else if (startHour === "") {
      document.getElementById("popup-general-start-time").focus();
      return;
    } else if (endDay === "") {
      document.getElementById("popup-general-end-day").focus();
      return;
    } else if (endHour === "") {
      document.getElementById("popup-general-end-time").focus();
      return;
    } else if (!compareDates(startTime, endTime)) {
      document.getElementById("create-exam-time_err").innerText =
        "Thời gian bắt đầu phải lớn hơn thời gian kết thúc";
      return;
    }
    console.log(compareDates(startTime, endTime));
    console.log("finish");
  }

  console.log("start time: ", startTime);

  const examDescription = normalizeString(
    document.getElementById("popup-general-description").value
  );

  if (!examTitle || examTitle === "") {
    document.getElementById("popup-general-name").focus();
    return;
  }

  await ExamAPI.edit(examId, examTitle, examDescription, startTime, endTime);
  closeGeneralPopUp();
  loadManageExamPage();
};

const delQuestion = async (questionId) => {
  const examId = new URLSearchParams(window.location.search).get("id");
  await QuestionAPI.delete(questionId);
  loadManageExamPage(examId);
  closePopUp();
};

const addQuestionOnManage = async () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  const content = document.getElementById("topic-input").value;
  const option1 = document.getElementById("answer-a-input").value;
  const option2 = document.getElementById("answer-b-input").value;
  const option3 = document.getElementById("answer-c-input").value;
  const option4 = document.getElementById("answer-d-input").value;

  document.getElementById("topic-input").value = "";
  document.getElementById("answer-a-input").value = "";
  document.getElementById("answer-b-input").value = "";
  document.getElementById("answer-c-input").value = "";
  document.getElementById("answer-d-input").value = "";

  let answer = "";
  var checkbox = document.getElementsByName("manage-new-answer");
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      answer = checkbox[i].value;
    }
  }

  if (answer === "A") answer = option1;
  else if (answer === "B") answer = option2;
  else if (answer === "C") answer = option3;
  else answer = option4;

  await QuestionAPI.add(
    content,
    option1,
    option2,
    option3,
    option4,
    answer,
    examId
  );

  loadManageExamPage();
};

const saveQuestion = async (questionId) => {
  const content = document.getElementById("edit-topic-input").value;
  const option1 = document.getElementById("edit-answer-a-input").value;
  const option2 = document.getElementById("edit-answer-b-input").value;
  const option3 = document.getElementById("edit-answer-c-input").value;
  const option4 = document.getElementById("edit-answer-d-input").value;

  let answer = "";
  const radioInputs = document.getElementsByName("edit-answer");
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked === true) {
      answer = radioInputs[i].value;
      break;
    }
  }
  console.log("answer: ", answer);

  if (content === "") {
    document.getElementById("edit-topic-input").focus();
    return;
  }
  if (option1 === "") {
    document.getElementById("edit-answer-a-input").focus();
    return;
  }
  if (option2 === "") {
    document.getElementById("edit-answer-b-input").focus();
    return;
  }
  if (option3 === "") {
    document.getElementById("edit-answer-c-input").focus();
    return;
  }
  if (option4 === "") {
    document.getElementById("edit-answer-d-input").focus();
    return;
  }

  await QuestionAPI.edit(
    questionId,
    content,
    option1,
    option2,
    option3,
    option4,
    answer,
    examId
  );

  loadManageExamPage(examId);
  closePopUp();
};

const delExam = async () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  document.addEventListener("DOMContentLoaded", loadManageExamPage(examId));

  await ExamAPI.delete(examId);
  redirectToNewPage("/exam-admin");
};

//Add page
const onChangeExamType = () => {
  const examType = document.getElementById("exam-type").value;
  const examTime = document.getElementById("create-exam-time");
  console.log("exam type: ", examType);
  if (examType === "Tự do") {
    examTime.style.visibility = "hidden";
  } else if (examType === "Thời gian cố định") {
    examTime.style.visibility = "visible";
  }
};

const addQuestion = (content, option1, option2, option3, option4, answer) => {
  const newQuestionBox = document.createElement("div");
  const newQuestion = {
    content,
    option1,
    option2,
    option3,
    option4,
    answer,
    exam: {},
  };

  newQuestionBox.classList.add("question-box");
  newQuestionBox.id = `questionIndex-${questionIndex}`;

  const answerContainer = document.createElement("div");
  answerContainer.innerHTML = `
    <span style="font-weight: 600">Câu hỏi ${questionIndex + 1}:</span>
    <span class="topic"
      >${content}</span
    >
    <form onchange="onChangeCorrectAnswer(this, ${questionIndex})">
      <label class="answer">
        <input type="radio" name="answer" value="${option1}"  ${
    answer === option1 ? "checked" : ""
  } /> A.
        ${option1}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="${option2}" ${
    answer === option2 ? "checked" : ""
  }/> B.
        ${option2}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="${option3}" ${
    answer === option3 ? "checked" : ""
  }/> C.
         ${option3}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="${option4}" ${
    answer === option4 ? "checked" : ""
  }/> D.
        ${option4}
      </label>
    </form>
  `;
  newQuestionBox.appendChild(answerContainer);

  document.getElementById("list-question-box").appendChild(newQuestionBox);

  newQuestion["content"] = content;
  newQuestion["option1"] = option1;
  newQuestion["option2"] = option2;
  newQuestion["option3"] = option3;
  newQuestion["option4"] = option4;

  listQuestion[questionIndex] = newQuestion;

  questionIndex += 1;
};

const addQuestionByManual = () => {
  const content = document.getElementById("topic-input").value;
  const option1 = document.getElementById("answer-a-input").value;
  const option2 = document.getElementById("answer-b-input").value;
  const option3 = document.getElementById("answer-c-input").value;
  const option4 = document.getElementById("answer-d-input").value;
  const answer = option1;

  addQuestion(content, option1, option2, option3, option4, answer);
  console.log("list question: ", listQuestion);
};

const addQuestionByFile = () => {
  const input = document.getElementById("create-file-input");

  if (input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];
      const lastRow = parseInt(sheet["!ref"].split(":")[1].match(/\d+/)[0]);
      for (let i = 2; i <= lastRow; i++) {
        const content = sheet[`A${i}`].v;
        const option1 = sheet[`B${i}`].v;
        const option2 = sheet[`C${i}`].v;
        const option3 = sheet[`D${i}`].v;
        const option4 = sheet[`E${i}`].v;
        let answer = sheet[`F${i}`].v;

        if (answer === "A") answer = option1;
        else if (answer === "B") answer = option2;
        else if (answer === "C") answer = option3;
        else answer = option4;

        addQuestion(content, option1, option2, option3, option4, answer);
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

function parseSheet(sheet) {
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  const result = [];
  let currentQuestion = {};

  for (const row of data) {
    if (row[0].startsWith("Câu")) {
      if (Object.keys(currentQuestion).length > 0) {
        result.push(currentQuestion);
      }

      currentQuestion = { question: row[0], options: [] };
    } else {
      const option = { A: row[1], B: row[2], C: row[3], D: row[4] };
      currentQuestion.options.push(option);
    }
  }

  if (Object.keys(currentQuestion).length > 0) {
    result.push(currentQuestion);
  }

  return result;
}

const onChangeCorrectAnswer = (form, id) => {
  const selectedValue = form.querySelector(
    'input[name="answer"]:checked'
  ).value;
  listQuestion[id]["answer"] = selectedValue;
};

const saveNewExam = async () => {
  const examTitle = normalizeString(document.getElementById("exam-name").value);
  const examType = document.getElementById("exam-type").value;
  let startTime = null,
    endTime = null,
    startDate = null,
    endDate = null,
    startHour = null,
    endHour = null;

  if (examType !== "Tự do") {
    startDate = document.getElementById("exam-start-time").value;
    endDate = document.getElementById("exam-end-time").value;

    startHour = document.getElementById("exam-start-hour").value;
    endHour = document.getElementById("exam-end-hour").value;

    startTime = createTimestamp(startHour, startDate);
    endTime = createTimestamp(endHour, endDate);
  }

  const examDescription = normalizeString(
    document.getElementById("exam-description").value
  );

  if (!examTitle || examTitle === "") {
    document.getElementById("exam-name").focus();
    return;
  }

  if (examType === "Thời gian cố định") {
    if (startDate === "") {
      document.getElementById("exam-start-time").focus();
      return;
    } else if (startHour === "") {
      document.getElementById("exam-start-hour").focus();
      return;
    } else if (endDate === "") {
      document.getElementById("exam-end-time").focus();
      return;
    } else if (endHour === "") {
      document.getElementById("exam-end-hour").focus();
      return;
    } else if (!compareDates(startTime, endTime)) {
      document.getElementById("create-exam-time_err").innerText =
        "Thời gian bắt đầu phải lớn hơn thời gian kết thúc";
      document.getElementById("exam-end-hour").focus();
      return;
    }
    console.log(compareDates(startTime, endTime));
  }

  await ExamAPI.add(
    examTitle,
    examDescription,
    startTime,
    endTime,
    listQuestion
  );

  redirectToNewPage("/exam-admin");
};

const loadExamPage = async (inputExam) => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    redirectToNewPage("/admin");
  }
  listExams = await ExamAPI.getAll();

  document.getElementById("exam-list").innerHTML = "";
  document.getElementById("exam-boxs").innerHTML = "";

  const listLoadedExam = inputExam || listExams;
  console.log("list loaded exam: ", listLoadedExam);
  let examId = 1;
  listLoadedExam.forEach((exam) => {
    const {
      id,
      examTitle,
      examDescription,
      examStartTime,
      examEndTime,
      startTime,
      endTime,
    } = exam;

    const examRow = document.createElement("tr");
    examRow.onclick = function () {
      redirectToNewPage(`exam-admin/manage`, "id", id);
    };

    if (startTime && endTime) {
      examRow.innerHTML = `
        <td>${id}</td>
        <td>${examTitle}</td>
        <td>Thời gian cố định</td>
        <td>${covertTimestampToString(startTime)}</td>
        <td>${covertTimestampToString(endTime)}</td>
        <td>${examDescription}</td>
      `;
    } else {
      examRow.innerHTML = `
        <td>${id}</td>
        <td>${examTitle}</td>
        <td>Tự do</td>
        <td></td>
        <td></td>
        <td>${examDescription}</td>
      `;
    }

    const examBox = document.createElement("div");
    examBox.className = "exam-box";
    examBox.onclick = function () {
      redirectToNewPage("manage-exam.html", "id", examKey);
    };

    examBox.innerHTML = `
      <p>Ngày bắt đầu: ${examStartTime}</p>
      <p>Ngày kết thúc: ${examEndTime}</p>
      <div style="display: flex; align-items: center; gap: 4px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style="width: 16px"
        >
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
          />
        </svg>
        40 câu hỏi
      </div>
    `;

    document.getElementById("exam-list").appendChild(examRow);
    document.getElementById("exam-boxs").appendChild(examBox);
  });
};

const loadManageExamPage = async () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    redirectToNewPage("/admin");
  }

  const examId = new URLSearchParams(window.location.search).get("id");
  const { examTitle, startTime, endTime, examDescription, questionList } =
    await ExamAPI.getDetailById(examId);

  // Chèn thông tin chung
  document.getElementById("manage-exam-name").innerText = examTitle;
  document.getElementById("manage-general-exam-name").innerText = examTitle;

  if (startTime && endTime) {
    document.getElementById("manage-exam-type").innerText = "Thời gian cố định";
    document.getElementById("manage-exam-start-time").innerText =
      covertTimestampToString(startTime);
    document.getElementById("manage-exam-end-time").innerText =
      covertTimestampToString(endTime);
  } else {
    document.getElementById("manage-exam-type").innerText = "Tự do";
    document.getElementById("manage-exam-start-time").innerText = "";
    document.getElementById("manage-exam-end-time").innerText = "";
  }

  document.getElementById("manage-exam-question-total").innerText =
    questionList.length;

  document.getElementById("manage-exam-description").innerText =
    examDescription;

  //Xóa tất cả các câu hỏi đang có
  const manageQuestionContent = document.getElementById(
    "manage-quetion-content"
  );

  while (manageQuestionContent.firstChild) {
    manageQuestionContent.removeChild(manageQuestionContent.firstChild);
  }

  //Thêm câu hỏi
  let questionOrder = 1;
  questionList.forEach((question) => {
    const { id, answer, content, option1, option2, option3, option4 } =
      question;

    const newQuestionBox = document.createElement("div");
    newQuestionBox.classList.add("question-box");
    const qsOrder = questionOrder;
    newQuestionBox.onclick = function () {
      openPopUp(
        qsOrder,
        content,
        option1,
        option2,
        option3,
        option4,
        answer,
        id
      );
    };
    const answerContainer = document.createElement("div");
    answerContainer.innerHTML = `
    <span class="topic" style="font-weight: 600"
      >Câu ${questionOrder++}:</span
    >
    <span>${content}</span>
    <div class="manage-list-answer">
      <span class="answer">
        A. ${option1}
      </span>
       <span class="answer">
        B. ${option2}
      </span>
       <span class="answer">
        C. ${option3}
      </span>
       <span class="answer">
        D. ${option4}
      </span>
    </div>
    <div><span>Đáp án đúng: ${answer}</span></div>
  `;
    newQuestionBox.appendChild(answerContainer);

    document
      .getElementById("manage-quetion-content")
      .appendChild(newQuestionBox);
  });
};

function DangXuat(){
    localStorage.clear();
}