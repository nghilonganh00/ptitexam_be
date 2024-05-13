var barChart;
async function fetchInfo() {
        try {
            const jwt = localStorage.getItem("jwt");
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            };
            const response = await fetch("http://localhost:8080/statisticApi",requestOptions)
            const exam = await response.json();
            document.getElementById('statisticPage').style.display="block"
            return exam;
        } catch (error) {
            console.log(error);
            if(response.status==401)
                window.location.href="/admin";
        }
}




async function loadInfo(){
    var tkBT = await fetchInfo();
    displayTable(tkBT);
    const searchInput = document.querySelector("[data-search]")
    searchInput.addEventListener("input", e => {
        const value = e.target.value;
        let a=[]
        tkBT.forEach(user => {
            const isVisible =
              (user.examTitle.toLowerCase().includes(value.toLowerCase()) || user.examId.toString().includes(value.toLowerCase()))
            if(isVisible){
                a.push(user);
            }
          })
        displayTable(a);
    })
}
loadInfo();
function displayTable (tkBT) {

    let placeholder = document.querySelector("#data-output");
    let out = "";
    var i=0;
    for (let baithi of tkBT){
        out+= 
        `
            <tr>
                <td class="cot-1"> ${baithi.examId}</td>
                <td class="cot-2">${baithi.examTitle}</td>
                <td class="cot-1">${baithi.totalTakenTime}</td>
                <td class="cot-1">${baithi.averageScore.toFixed(2)}</td>
                <td class="cot-1">
                    <button class="open-chart" id="open-chart${baithi.examId}">
                        <i class="fa-solid fa-chart-simple"></i>
                    </button>
                </td>
            </tr>
        `;
        i++;       
    }
    

    placeholder.innerHTML=out;
    for(let baithi of tkBT){
        temp = "open-chart"+baithi.examId.toString();
        console.log(temp);
        var openBtn = document.getElementById(temp);
        openBtn.addEventListener('click', async () => {
        console.log(baithi.examId);

        const jwt = localStorage.getItem("jwt");
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`
                        },
                    };
        document.getElementById('header-chart-name').innerHTML= "<h1>"+baithi.examTitle+"</h1><button class='print-btn' id='print-btn'><i class='fa-regular fa-file-pdf'></i></button>";
        const response = await fetch("http://localhost:8080/statisticApi/scoreDistribution?exam_id="+baithi.examId.toString(),requestOptions);
        if(response.status===200){
            var x = await response.json();

            var arr= [];
            arr.push(x.zero);
            arr.push(x.four)
            arr.push(x.sixPointFive);
            arr.push(x.eight)
            arr.push(x.nine);
            document.getElementById('chart-body').innerHTML="<div class='chart-row-2'><canvas id='barChart'></canvas><h5>Phổ điểm</h5></div> ";

                    const ctx = document.getElementById('barChart');
                    if(barChart)
                        barChart.destroy();
                    barChart=new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['0-4', '4-6.5', '6.5-8', '8-9','9-10'],
                            datasets: [{
                                label: 'Số lượng',
                                data: arr,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            reponsive:true,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

        }else{
            document.getElementById('chart-body').innerHTML="<h2>Không có dữ liệu</h2>";
        }
        document.querySelector('.chart-container').style.display="block";
        document.querySelector('.overlay').style.display="block";
    })
    }
    cnt(tkBT);
}



function cnt(tkBT){
    document.getElementById("cnt-exam").value= tkBT.length.toString();
}


const closeBtn = document.getElementById('close-chart-btn');
const chart = document.getElementById('chart-container');
closeBtn.addEventListener('click', () => {
    document.querySelector('.chart-container').style.display="none";
    document.querySelector('.overlay').style.display="none";
})
// document.getElementById('overlay').addEventListener('click', ()=>{
//     document.querySelector('.chart-container').style.display="none";
//     document.querySelector('.overlay').style.display="none";
// })



function DangXuat(){
    localStorage.clear();
}