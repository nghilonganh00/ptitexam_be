console.log('2')
var acc=[]
var userId = 0

async function fetchUser(){
    const jwt  = localStorage.getItem('jwt')
    const requestOptions = {
        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`
                        },
    }
    const response = await fetch("http://localhost:8080/user/getAll",requestOptions)
                const users = await response.json();
                return users;
}
async function load(){
    var data  = await fetchUser()
    data.map(e=>{
                    acc.push({
                    uid:e.id,
                        id:e.username,
                        name:e.fullName===null ? "null": e.fullName ,
                        email:e.email,
                        password: e.password,
                        birthday: e.dob===null ?   "null": e.dob.slice(0,10)
                    })
                    })
                    loadTableAcc(acc)
                    capnhapbangtim()
}
load()
 loadTableAcc(acc)


console.log('1')
//console.log(acc1)

document.addEventListener("DOMContentLoaded", function () {
    loadTableAcc(acc);
});

console.log(acc)
loadTableAcc(acc)

// Chuc nang tim kiem
var ar = []
function capnhapbangtim() {
    ar=[]
    for (var i = 0; i < acc.length; i++) {
        ar.push((acc[i].id + acc[i].name).toLowerCase())
    }
}
capnhapbangtim()
console.log(ar)
var table1 = document.getElementById("dataTable")
const search = document.querySelector('.input-group input'),
    table_rows = table1.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');


search.addEventListener('input', searchTable);

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

            var formData = {
                    username: id,
                    fullName: name,
                    email: email,
                    password: password,
                    dob: birthday,
                   roles:[]
            }
            const jwt  = localStorage.getItem('jwt')
            $.ajax({
                url: 'user/add',
                type: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                contentType:'application/json',
                data: JSON.stringify(formData),
                success: function(response){
                            load()
                    console.log('add user successfully')
                    capnhapbangtim()
                                loadTableAcc(acc)
                },
                error: function(error){
                alert("Loi trung username hoac email")
                console.log(error)
                }
            })
            capnhapbangtim()
            loadTableAcc(acc)


    document.querySelector(".container").style.display = "none"

})

var bangduocchon = "score-container1"


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

        var passwordCell = document.createElement("td");
        passwordCell.textContent = rowAcc.password;
        row.appendChild(passwordCell);

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
            document.querySelector('.container-edit').style.display = "flex"
            var roww = acc[x]

            document.getElementById('id-edit').value = roww.id;
            document.getElementById('name-edit').value = roww.name;
            document.getElementById('birthday-edit').value = roww.birthday;
            document.getElementById('email-edit').value = roww.email;
            document.getElementById('password-edit').value = roww.password;
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
            var rowindex = this.id
            var userId = acc[rowindex].uid;
            console.log(userId)

            acc.splice(Number.parseInt(rowindex), 1)
            const jwt = localStorage.getItem('jwt')
            $.ajax({
                url:'/user/delete?userId='+userId,
                type: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                success: function(response){
                    console.log('xoa thanh cong')
                },
                error:  function(error){
                     console.log(error)
                }

            })

            console.log(acc)
            capnhapbangtim()
            loadTableAcc(acc)
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
        showButton.addEventListener("click", function () {

            var s = "score-container"
            if (Math.random() > 0.5) {
                s += '1'
                bangduocchon = s
            }
            else {
                s += '2'
                bangduocchon = s
            }

            document.getElementById(s).style.display = "flex"
            document.getElementById("mainpanel").style.display = "none"
            // document.getElementById(s).style.display="flex"
        })
        var showCell = document.createElement('td')
        showCell.appendChild(showButton)
        row.appendChild(showCell)


        // Gắn hàng vào tbody của bảng
        tableBody.appendChild(row);
    }

}


// nut xac nhan sua
//document.getElementById("btnSua").addEventListener("click", function () {
//    var id = document.getElementById('id-edit').value
//    var name = document.getElementById('name-edit').value
//    var email = document.getElementById('email-edit').value
//    var birthday = document.getElementById('birthday-edit').value
//    var password = document.getElementById('password-edit').value
//    // console.log(rowIndex)
//    console.log(id + " " + name + " " + email + " " + password)
//    acc[rowNumber1] = {
//        id: id.toString(),
//        name: name.toString(),
//        email: email.toString(),
//        password: password.toString(),
//        birthday: birthday.toString(),
//
//    }
//
//
//
//    capnhapbangtim()
//    loadTableAcc(acc)

//    document.querySelector('.container-edit').style.display = "none"
//})

function Xacnhansua() {
    var id = document.getElementById('id-edit').value
    var name = document.getElementById('name-edit').value
    var email = document.getElementById('email-edit').value
    var password = document.getElementById('password-edit').value
    var birthday = document.getElementById('birthday-edit').value
    // console.log(rowIndex)
    console.log(id + " " + name + " " + email + " " + password)
    try{

    }
    catch(error){
        alert("Loi trung username, email voi tai khoan khac")
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
                    password: password.toString(),
                    dob: birthday.toString(),
                        roles:[]
        }
        const jwt = localStorage.getItem('jwt')
        console.log(userId)
        $.ajax({
            url: '/user/edit?userId='+userId,
            type:'PUT',
            headers: {
                        'Authorization': `Bearer ${jwt}`
                    },
            contentType: 'application/json',
            data:JSON.stringify(updatedUser),
            success: function(response){
            console.log("sua thanh cong")},
            error: function(error){
                    console.log(error)}
        })
    capnhapbangtim()
    loadTableAcc(acc)
    document.querySelector('.container-edit').style.display = "none"

}


document.getElementById("close-buttonkq1").addEventListener("click", function () {
    document.getElementById("score-container1").style.display = 'none'
    document.getElementById("score-container2").style.display = 'none'
    document.getElementById("mainpanel").style.display = "flex"
})
document.getElementById("close-buttonkq2").addEventListener("click", function () {
    document.getElementById("score-container2").style.display = 'none'
    document.getElementById("score-container1").style.display = 'none'
    document.getElementById("mainpanel").style.display = "flex"

})


function xemtriet() {
    // document.getElementById("detriet").style.display = "flex"
    // document.getElementById("score-container1").style.display = "none"
    // document.getElementById("score-container2").style.display = "none"
    window.location.href='/kqtriet.html'

}
function xemgiaitich() {
    // document.getElementById("degiaitich").style.display = "flex"
    // document.getElementById("score-container1").style.display = "none"
    // document.getElementById("score-container2").style.display = "none"
    window.location.href='/kqgiaitich.html'
}
function xemvatly() {
    // document.getElementById("devatly").style.display = "flex"
    // document.getElementById("score-container1").style.display = "none"
    // document.getElementById("score-container2").style.display = "none"
    window.location.href='/kqvatly.html'
}
function xemttdd() {
    // document.getElementById("dethongtindidong").style.display = "flex"
   
    // document.getElementById("score-container1").style.display = "none"
    // document.getElementById("score-container2").style.display = "none"
    window.location.href='/kqttdd.html'

}
function donganh() {
    document.getElementById("detriet").style.display = "none"
    document.getElementById("degiaitich").style.display = "none"
    document.getElementById("devatly").style.display = "none"
    document.getElementById("dethongtindidong").style.display = "none"

    document.getElementById(bangduocchon).style.display = "flex"
    // document.getElementById("score-container2").style.display="flex"
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
    <link rel="stylesheet" type="text/css" href="b21dccn541/style.css">
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
pdf_btn2.onclick = () => {
    toPDF2(students_table2);
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