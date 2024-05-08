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
            return exam;
        } catch (error) {
            console.error(error);
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
                <td class="cot-1">0</td>
                <td class="cot-1">${baithi.averageScore}</td>
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

const ctx = document.getElementById('barChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0-4', '4-6.5', '6.5-8', '8-9','9-10'],
        datasets: [{
            label: 'Số lượng',
            data: [10,20,10,20,33,24],
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

const ctx2 = document.getElementById('doughnut');

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Hoàn thành', 'Chưa hoàn thành'],
      datasets: [{
        label: 'Tỷ lệ hoàn thành',
        data: [12, 19],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,

    }
  });