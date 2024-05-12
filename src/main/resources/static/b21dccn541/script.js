if (localStorage.getItem('jwt')===null) {
alert("Bạn chưa đăng nhập, vui lòng đăng nhập!")
window.location.href="/login"}

console.log('2')
var acc = [], rowindex=0 , roww
var userId = 0
async function fetchUser() {
    const jwt = localStorage.getItem('jwt')
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    }
    const response = await fetch("http://localhost:8080/user/getAll", requestOptions)
    const users = await response.json();
    return users;
}
async function load() {
    acc=[]
    var data = await fetchUser()
    data.map(e => {
        acc.push({
            uid: e.id,
            id: e.username,
            name: e.fullName === null ? "null" : e.fullName,
            email: e.email,
            password: e.password,
            birthday: e.dob === null ? "null" : e.dob.slice(0, 10)
        })
    })
    loadTableAcc(acc)
    capnhapbangtim()
}
load()
loadTableAcc(acc)

document.addEventListener("DOMContentLoaded", function () {
    loadTableAcc(acc);
});

loadTableAcc(acc)
// Chuc nang tim kiem
var ar = []
function capnhapbangtim() {
    ar = []
    for (var i = 0; i < acc.length; i++) {
        ar.push((acc[i].id + acc[i].name).toLowerCase())
    }
}
capnhapbangtim()
console.log(ar)
var table1 = document.getElementById("dataTable")
const search = document.querySelector('.input-group input'),
table_rows = table1.querySelectorAll('tbody tr');
search.addEventListener('input', searchTable);

var scoreTable = document.getElementById("scoreTable"),
score_table_rows = scoreTable.querySelectorAll('tbody tr');

var id = 0;
function searchTable() {
    loadTableAcc(acc)
    capnhapbangtim()
    let search_data = search.value.toLowerCase();
    let droprow = []
    for (var i = 0; i < ar.length; i++) {
        if (ar[i].indexOf(search_data) < 0) {
            // console.log(acc)
            droprow.push(i)
        }
    }
    var acccopy = [].concat(acc)
    console.log(droprow)
    for (var i = droprow.length - 1; i >= 0; i--) {
        acccopy.splice(droprow[i], 1)
    }
    droprow.slice(0)
    loadTableAcc(acccopy)
}

var rowNumber1 = 1;
document.getElementById("plus-button").addEventListener("click", function () {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
    document.getElementById('birthday').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.querySelector(".container").style.display = "flex"
})
//   NUT close
document.getElementById("close-button").addEventListener("click", function () {
    document.querySelector(".container").style.display = "none"
    // document.querySelector(".container-edit").style.display="none"
})
document.getElementById("close-button1").addEventListener("click", function () {
    // document.querySelector(".container").style.display="none"
    document.querySelector(".container-edit").style.display = "none"
})

document.getElementById("btnThem").addEventListener("click", function () {
    var id = document.getElementById('id').value
    var name = document.getElementById('name').value
    var birthday = document.getElementById('birthday').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    if(!id || !name|| !email|| !birthday|| !password){
            alert("Xin vui lòng nhập đủ thông tin!")
                        return
        }
    if(!(isValidDateFormat(birthday))){
            alert("Xin vui lòng nhập ngày sinh đúng định dạng!")
            return
        }
    if(password.legth<8){
    alert("Xin vui lòng nhập mật khẩu gồm ít nhất 8 ký tự!")
                return
    }
        if(email.substring(email.length-10,email.length)!=='@gmail.com'){
        alert("Xin vui lòng nhập email hợp lệ!")
                    return
        }
    var formData = {
        username: id,
        fullName: name,
        email: email,
        password: password,
        dob: birthday,
        roles: []
    }
    const jwt = localStorage.getItem('jwt')
    $.ajax({
        url: 'user/add',
        type: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            load()
            console.log('add user successfully')
            capnhapbangtim()
            loadTableAcc(acc)
        },
        error: function (error) {
            alert("Loi trung username hoac email")
            console.log(error)
        }
    })
    capnhapbangtim()
    loadTableAcc(acc)
    document.querySelector(".container").style.display = "none"

})
loadTableAcc(acc)
var bangduocchon = "score-container1"
function isValidDateFormat(dateString) {
  var pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateString);
}

function loadTableAcc(acc) {
    var tableBody = document.querySelector("#dataTable tbody");

    // Xóa dữ liệu hiện có
    tableBody.innerHTML = "";

    // Lặp qua mảng dữ liệu và tạo các hàng trong bảng
    for (var i = 0; i < acc.length; i++) {
        var rowAcc = acc[i];
        var row = document.createElement("tr");

        // Tạo các ô dữ liệu trong hàng
        var msvCell = document.createElement("td");
        msvCell.textContent = rowAcc.id;
        row.appendChild(msvCell);

        var nameCell = document.createElement("td");
        nameCell.textContent = rowAcc.name;
        row.appendChild(nameCell);

        var birthdayCell = document.createElement("td");
        birthdayCell.textContent = rowAcc.birthday;
        row.appendChild(birthdayCell);


        var emailCell = document.createElement("td");
        emailCell.textContent = rowAcc.email;
        row.appendChild(emailCell);

//        var passwordCell = document.createElement("td");
//        passwordCell.textContent = rowAcc.password;
//        row.appendChild(passwordCell);

        // Tạo một div chứa cả hai nút Xóa và Sửa
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("icon-container")
        // Tạo nút Sửa
        var editButton = document.createElement("button");
        editButton.textContent = "Sửa"
        editButton.classList.add("edit-button")
        // editButton.className="edit-button"
        // editButton.rowNo=i
        editButton.id = i.toString()


        // nhan nut sua

        editButton.addEventListener("click", function () {
            var x = Number.parseInt(this.id)

            rowNumber1 = Number.parseInt(this.id)
            userId = acc[rowNumber1].uid
            console.log(userId)
            document.querySelector('.container-edit').style.display = "flex"
            roww = acc[x]

            document.getElementById('id-edit').value = roww.id;
            document.getElementById('name-edit').value = roww.name;
            document.getElementById('birthday-edit').value = roww.birthday;
            document.getElementById('email-edit').value = roww.email;
            document.getElementById('password-edit').value = "";
            console.log(rowNumber1)
            capnhapbangtim()

        });
        buttonContainer.appendChild(editButton);

        // Tạo nút Xóa
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa"
        deleteButton.classList.add("delete-button")
        deleteButton.id = i.toString()
        deleteButton.addEventListener("click", function () {
             document.getElementById("container-confirm").style.display="flex"
            rowindex = Number.parseInt(this.id)

             userId = acc[rowindex].uid;
            console.log(userId)


        });

        buttonContainer.appendChild(deleteButton);

        // Gắn div chứa nút vào ô dữ liệu tương ứng trong hàng
        var buttonCell = document.createElement("td");
        buttonCell.appendChild(buttonContainer);
        row.appendChild(buttonCell);

        // tao nut xem ket qua
        var showButton = document.createElement("button");
        var image = document.createElement("img");
        image.src = "b21dccn541/eye-png-24041.png";
        showButton.appendChild(image)
        showButton.classList.add("show-button")
        showButton.id=i.toString()
        showButton.addEventListener("click", function () {
            rowindex = Number.parseInt(this.id)
            console.log(rowindex)
            userId = acc[rowindex].uid
            document.getElementById("score-container1").style.display = "flex"
//            document.getElementById("studentAcc_table").style.display = "none"
            loadScoreTable()
        })
        var showCell = document.createElement('td')
        showCell.appendChild(showButton)
        row.appendChild(showCell)


        // Gắn hàng vào tbody của bảng
        tableBody.appendChild(row);
    }

}

function Xacnhansua() {
    var id = document.getElementById('id-edit').value
    var name = document.getElementById('name-edit').value
    var email = document.getElementById('email-edit').value
    var password = document.getElementById('password-edit').value
    var birthday = document.getElementById('birthday-edit').value
    console.log(id + " " + name + " " + email + " " + password)
    if(!(isValidDateFormat(birthday))){
        alert("Hãy nhập ngày sinh đúng định dạng!")
        return
    }

    acc[rowNumber1] = {
        id: id.toString(),
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
        birthday: birthday.toString()
    }

    var updatedUser = {
        username: id.toString(),
        fullName: name.toString(),
        email: email.toString(),
        password: (password.toString()  === "" )? roww.password:  password.toString(),
        dob: birthday.toString(),
        roles: []
    }
    const jwt = localStorage.getItem('jwt')
    console.log(userId)
    $.ajax({
        url: '/user/edit?userId=' + userId,
        type: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: function (response) {
            console.log("sua thanh cong")
            load()
                capnhapbangtim()
                loadTableAcc(acc)
        },
        error: function (error) {
            console.log(error)
        }
    })

    document.querySelector('.container-edit').style.display = "none"

}
function confirm(){
acc.splice(Number.parseInt(rowindex), 1)
            const jwt = localStorage.getItem('jwt')
            $.ajax({
                url: '/user/delete?userId=' + userId,
                type: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                success: function (response) {
                    console.log('xoa thanh cong')
                    load()
                    capnhapbangtim()
                    loadTableAcc(acc)
                },
                error: function (error) {
                    console.log(error)
                }

            })
            load()
            console.log(acc)
            capnhapbangtim()
            loadTableAcc(acc)
            document.getElementById("container-confirm").style.display="none"
}
function close_popup_confirm(){
document.getElementById("container-confirm").style.display="none"
}
document.getElementById("close-buttonkq1").addEventListener("click", function () {
    document.getElementById("score-container1").style.display = 'none'
    document.getElementById("score-container2").style.display = 'none'
//    document.getElementById("studentAcc_table").style.display = "flex"
})
//document.getElementById("close-buttonkq2").addEventListener("click", function () {
//    document.getElementById("score-container2").style.display = 'none'
//    document.getElementById("score-container1").style.display = 'none'
//    document.getElementById("mainpanel").style.display = "flex"
//
//})




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


// tao bang diem chi tiet cua sinh vien
var scoreTable = document.getElementById("scoreTable"),
score_table_rows = scoreTable.querySelectorAll('tbody tr');
function loadScoreTable() {
const jwt  = localStorage.getItem("jwt")
    $.ajax({
        url:"/user/getResult?user_id="+userId,
        type:"GET",
        headers:{
        'Authorization': `Bearer ${jwt}`
        },
        success: function(response){
                let ScoreTableBody = document.querySelector("#scoreTable tbody");
                    ScoreTableBody.innerHTML = "";
                response.map(e=>{
                let ExamResultId = e.id
                let ExamId = e.exam_id
                let ExamTitle= e.exam_title
                let score = e.score
                let row = document.createElement("tr");

                        // Tạo các ô dữ liệu trong hàng
                        let nameCell = document.createElement("td");
                        nameCell.textContent = e.exam_title;
                        row.appendChild(nameCell);

                        let scoreCell = document.createElement("td");
                        scoreCell.textContent = e.score;
                        row.appendChild(scoreCell);

                        let startTimeCell = document.createElement("td");
                        startTimeCell.textContent = e.start_time;
                        row.appendChild(startTimeCell);

                        let detailCell = document.createElement("td");
                       detailCell.textContent = "Xem chi tiết";
                       detailCell.addEventListener("click",()=>{
                            localStorage.setItem('fullName',acc[rowindex].name)
                            localStorage.setItem('username',acc[rowindex].id)
                            localStorage.setItem('ExamResultId',ExamResultId)
                            localStorage.setItem('ExamTitle',ExamTitle)
                            localStorage.setItem('score',score)
                            localStorage.setItem('ExamId',ExamId)
                            window.location.href="./exam_result"
//                                window.location.href="./startExam"
                       })

                        row.appendChild(detailCell);
                       ScoreTableBody.appendChild(row)
                })
        },
        error:  function (error) {
                           console.log(error)
        }


    })

}

// chuyen sang pdf
const pdf_btn = document.querySelector('#toPDF');
const pdf_btn2 = document.querySelector('#toPDF2');
const students_table = document.querySelector('#score_table');
const students_table2 = document.querySelector('#score_table2');
const students_table3 = document.querySelector('#studentAcc_table');


const toPDF = function (score_table) {
    const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="./b21dccn541/style.css">
    <main class="table" id=score-table">${score_table.innerHTML}</div>`;

    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}
const toPDF2 = function (score_table) {
    const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="b21dccn541/style.css">
    <main class="table" id=score-table2">${score_table.innerHTML}</div>`;

    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}



pdf_btn.onclick = () => {
    toPDF(students_table);
}
//pdf_btn2.onclick = () => {
//    toPDF2(students_table2);
//}