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
    } else if (passwordValue.length < 8 ) {
        setError(pass1, 'Mật khẩu ít nhất 8 kí tự')
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
            mail: emailValue,
            username: usernameValue,
            password: passwordValue
        }
        let json = JSON.stringify(user);
        localStorage.setItem(usernameValue,json);
        alert("Đăng kí thành công");
        window.location.href="index.html";
    }
    
};

const validateInputsLogin = () => {
    event.preventDefault();
    const uname = document.getElementById("login-username");
    const pass = document.getElementById("login-pass");
    const usernameValue = uname.value.trim();
    const passwordValue = pass.value.trim();
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
        const user= JSON.parse(localStorage.getItem(usernameValue));
        if(user == null){
            setError(pass,"Tài khoản không tồn tại")
        }
        else if(user.username == usernameValue && user.password == passwordValue){
            alert("Đăng nhập thành công")           
            window.location.href = "user-main.html";
            
        } else{
            setError(pass,"Mật khẩu không đúng")
        }

    }
    
};

const validateAdminLogin = () => {
    event.preventDefault();
    const uname = document.getElementById("login-username");
    const pass = document.getElementById("login-pass");
    const usernameValue = uname.value.trim();
    const passwordValue = pass.value.trim();
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
        const user= JSON.parse(localStorage.getItem(usernameValue));
        if(user == null){
            setError(pass,"Tài khoản không tồn tại")
        }
        else if(user.username == usernameValue && user.password == passwordValue){
            alert("Đăng nhập thành công")
            window.location.href="exam.html"           
        } else{
            setError(pass,"Mật khẩu không đúng")
        }

    }
    
};