const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    event.preventDefault();
    const form = document.getElementById('signup-form');
    const email = document.getElementById("signup-email");
    const uname = document.getElementById("signup-uname");
    const full_name = document.getElementById("fullName").value.trim()
    const pass1 = document.getElementById("signup-pass");
    const pass2 = document.getElementById("signup-pass2");
    const usernameValue = uname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = pass1.value.trim();
    const password2Value = pass2.value.trim();
    var check = true;
    if(usernameValue === '') {
        setError(uname, 'Nhập tên đăng nhập');
        check=false;
    } 

    if(emailValue === '') {
        setError(email, 'Nhập email');
        check=false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Nhập email hợp lệ');
        check=false;
    } 

    if(passwordValue === '') {
        setError(pass1, 'Nhập mật khẩu');
        check=false;
    } else if (passwordValue.length < 6 ) {
        setError(pass1, 'Mật khẩu ít nhất 6 kí tự')
        check=false;
    } 

    if(password2Value === '') {
        setError(pass2, 'Nhập lại mật khẩu');
        check=false;
    } else if (password2Value !== passwordValue) {
        setError(pass2, "Mật khẩu không trùng khớp");
        check=false;
    } 
    if(check){
        const user = {
            email: emailValue,
            username: usernameValue,
            password: passwordValue,
            fullName: full_name
        }

        let json = JSON.stringify(user);
        console.log(json)
        const apiUrl = 'http://localhost:8080/auth/register';
        const requestOptions = {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: json
         };
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(!data.status){
                    setError(pass2, data.message);
                }
                else{
                    alert("Đăng kí thành công");
                    window.location.href= "/student/login";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });



    }
    
};


const validateInputsLogin = () => {
    event.preventDefault();
    const uname = document.getElementById("login-username");
    const pass = document.getElementById("login-pass");
    const usernameValue = uname.value.trim();
    const passwordValue = pass.value;
    var check = true;
    if(usernameValue === '') {
        setError(uname, 'Nhập tên đăng nhập');
        check=false;
    } 


    if(passwordValue === '') {
        setError(pass, 'Nhập mật khẩu');
        check=false;
    } 
    if(check){
        login = {
                            username: usernameValue,
                            password: passwordValue
        }
        let json = JSON.stringify(login);
                const apiUrl1 = 'http://localhost:8080/auth/login';
                const requestOptions1 = {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: json
                 };
                fetch(apiUrl1, requestOptions1)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Sai tài khoản hoặc mật khẩu');
                        }
                        return response.json();
                    })
                    .then(data => {
                        window.location.href="/student/exam"
                        localStorage.setItem("jwt", data.message);
                        localStorage.setItem("user_id",data.user_id);
                    })
                    .catch(error => {
                        document.getElementById('login-err').innerText = "Sai tài khoản hoặc mật khẩu"
                    });

    }
    
};

const validateAdminLogin = () => {
    event.preventDefault();
        const uname = document.getElementById("login-username");
        const pass = document.getElementById("login-pass");
        const usernameValue = uname.value.trim();
        const passwordValue = pass.value;
        var check = true;
        if(usernameValue === '') {
            setError(uname, 'Nhập tên đăng nhập');
            check=false;
        }


        if(passwordValue === '') {
            setError(pass, 'Nhập mật khẩu');
            check=false;
        }
        if(check){
            login = {
                                username: usernameValue,
                                password: passwordValue
            }
            let json = JSON.stringify(login);
                    const apiUrl1 = 'http://localhost:8080/auth/admin';
                    const requestOptions1 = {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        body: json
                     };
                    fetch(apiUrl1, requestOptions1)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Sai tài khoản hoặc mật khẩu');
                            }
                            return response.json();
                        })
                        .then(data => {
                            window.location.href="/exam-admin"
                            localStorage.setItem("jwt", data.message);
                            localStorage.setItem("user_id",data.user_id);
                        })
                        .catch(error => {
                            document.getElementById('login-err-admin').innerText = "Sai tài khoản hoặc mật khẩu"
                        });

        }
    
};