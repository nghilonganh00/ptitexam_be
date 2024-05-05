async function getToken() {
        try {
            const response = await fetch("http://localhost:8080/auth/read-spring-cookie");
            const token = await response.text();
            return token;
        } catch (error) {
            console.error(error);
        }
}
async function fetchExam() {
        try {
            const jwt = await getToken();
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            };
            const response = await fetch("http://localhost:8080/exam/getAllExams",requestOptions)
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
}



async function loadExam () {
    var baiThi = await fetchExam();
    display(baiThi);
    var filter = document.getElementById("filter-op");

    filter.addEventListener("change",()=>{
        var filval = filter.value;
        if(filval=="all"){
            display(baiThi);
        }
        else if(filval=="tudo"){
            let a=[];
            for (i of baiThi){
                if(!i.startTime){
                    a.push(i);
                }
            }
            display(a);
        }
        else if(filval=="gh"){
            let a=[];
            for (i of baiThi){
                if(i.startTime){
                    a.push(i);
                }
            }
            display(a);
        }
    })



    const searchInput = document.querySelector("[data-search]")
    searchInput.addEventListener("input", e => {
        const value = e.target.value;
        let a=[]
        baiThi.forEach(user => {
            const isVisible =
              user.examTitle.toLowerCase().includes(value.toLowerCase())
            if(isVisible){
                a.push(user);
            }
          })
        console.log(a)
        display(a);
    })
}

loadExam()

function display(baiThi){
        let placeholder = document.querySelector("#user-exam-output");
        let out = "";
        for (let baithi of baiThi){
            console.log(baithi.start);
            if(!baithi.startTime){
                        out+=
                    `
                        <div class="box">
                            <div class="TenBaiThi">${baithi.examTitle}</div>
                            <div class="Content">
                                <span>- Số câu: </span> <br>
                                <span>- Thời gian: Tự do</span><br>
                                <span>&nbsp</span>
                            </div>
                            <div class="do-exam">
                                <a href="#" id="do-exam-btn">Bắt đầu</a>
                            </div>
                        </div>
                    `;
                    }
            else{
                start = baithi.startTime.toString();
                end = baithi.endTime.toString();
            out+=
            `   <div class="box">
                    <div class="TenBaiThi">${baithi.examTitle}</div>
                    <div class="Content">
                        <span>- Số câu: </span> <br>
                        <span>- Thời gian bắt đầu: ${start}</span><br>
                        <span>- Thời gian kết thúc: ${end}</span>
                    </div>
                    <div class="do-exam">
                        <button id="not-do-exam-btn">Bắt đầu</button>
                    </div>

                </div>
            `;
            }

        }

        placeholder.innerHTML=out;
}






//document.getElementById('do-exam-btn').addEventListener('click', ()=>{
//    window.location.href="index001.html"
//})