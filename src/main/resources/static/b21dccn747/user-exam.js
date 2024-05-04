var baiThi= [
    {
        name: "Luyện tập lập trình Web",
        soCau: 40,
        trangThai:0,
        start: "",
        end: ""
    },
    {
        name: "Thi cuối kì mạng máy tính",
        soCau: 40,
        trangThai:1,
        start: "14h 03/3/2024",
        end: "15h 03/3/2024"
    },
    {
        name: "Luyện tập lập trình Web",
        soCau: 40,
        trangThai:0,
        start: "",
        end: ""
    },
    {
        name: "Thi cuối kì mạng máy tính",
        soCau: 40,
        trangThai:1,
        start: "14h 03/3/2024",
        end: "15h 03/3/2024"
    },{
        name: "Luyện tập lập trình Web",
        soCau: 40,
        trangThai:0,
        start: "",
        end: ""
    },
    {
        name: "Thi cuối kì mạng máy tính",
        soCau: 40,
        trangThai:1,
        start: "14h 03/3/2024",
        end: "15h 03/3/2024"
    },{
        name: "Luyện tập lập trình Web",
        soCau: 40,
        trangThai:0,
        start: "",
        end: ""
    },
    {
        name: "Thi cuối kì mạng máy tính",
        soCau: 40,
        trangThai:1,
        start: "14h 03/3/2024",
        end: "15h 03/3/2024"
    },

]

function displayExam (baiThi) {
    let placeholder = document.querySelector("#user-exam-output");
    let out = "";
    for (let baithi of baiThi){
        let check = Number(baithi.trangThai)
        if(check>0){
            start = baithi.start.toString();
            end = baithi.end.toString();
        out+= 
        `   <div class="box">
                <div class="TenBaiThi">${baithi.name}</div>
                <div class="Content">
                    <span>- Số câu: ${baithi.soCau}</span> <br>
                    <span>- Thời gian bắt đầu: ${start}</span><br>
                    <span>- Thời gian kết thúc: ${end}</span>
                </div>
                <div class="do-exam">
                    <button id="not-do-exam-btn">Bắt đầu</button>
                </div>

            </div>
        `;
        }
        else{
            out+= 
        `   
            <div class="box">
                <div class="TenBaiThi">${baithi.name}</div>
                <div class="Content">
                    <span>- Số câu: ${baithi.soCau}</span> <br>
                    <span>- Thời gian: Tự do</span><br>
                    <span>&nbsp</span>
                </div>
                <div class="do-exam">
                    <button id="do-exam-btn">Bắt đầu</button>
                </div>
            </div>        
        `;
        }
    }

    placeholder.innerHTML=out;
}

displayExam(baiThi);
const searchInput = document.querySelector("[data-search]")
searchInput.addEventListener("input", e => {
    const value = e.target.value;
    let a=[]
    baiThi.forEach(user => {
        const isVisible =
          user.name.toLowerCase().includes(value.toLowerCase()) 
        if(isVisible){
            a.push(user);
        }
      })
    console.log(a)
    displayExam(a);
})


var filter = document.getElementById("filter-op");

filter.addEventListener("change",()=>{
    var filval = filter.value;
    if(filval=="all"){
        displayExam(baiThi);
    }
    else if(filval=="tudo"){       
        let a=[];
        for (i of baiThi){
            if(Number(i.trangThai)==0){
                a.push(i);
            }
        }
        displayExam(a);
    }
    else if(filval=="gh"){
        let a=[];
        for (i of baiThi){
            if(Number(i.trangThai)==1){
                a.push(i);
            }
        }
        displayExam(a);
    }
})

document.getElementById('do-exam-btn').addEventListener('click', ()=>{
    window.location.href="index001.html"
})