
var tkBT=[
    {
        id: "LTW01",
        name:"Luyện tập lập trình Web",
        soLuot: 580,
        tyLe: 90,
        diemTB: 7.2
    },
    {
        id: "MMT44",
        name:"Thi giữa kì mạng máy tính",
        soLuot: 380,
        tyLe: 60,
        diemTB: 8.1
    },
    {
        id: "CSDL12",
        name:"Kiểm tra chương 1 CSDL",
        soLuot: 580,
        tyLe: 90,
        diemTB: 7.2
    },
    {
        id: "DS06",
        name:"Luyện tập đại số",
        soLuot: 780,
        tyLe: 90,
        diemTB: 8.2
    },
    {
        id: "AI05",
        name:"Kiểm tra chương 2 TTNT",
        soLuot: 780,
        tyLe: 100,
        diemTB: 6.5
    },
    {
        id: "OS10",
        name:"Kiểm tra giữa kì hệ điều hành",
        soLuot: 780,
        tyLe: 100,
        diemTB: 5.8
    },
    
]

function displayTable (tkBT) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    var i=0;
    for (let baithi of tkBT){
        out+= 
        `
            <tr>
                <td class="cot-1"> ${baithi.id}</td>
                <td class="cot-2">${baithi.name}</td>
                <td class="cot-1">${baithi.soLuot}</td>
                <td class="cot-1">${baithi.tyLe}</td>
                <td class="cot-1">${baithi.diemTB}</td>
                <td class="cot-1">
                    <button class="open-chart" id="open-chart${i}">
                        <i class="fa-solid fa-chart-simple"></i>
                    </button>
                </td>
            </tr>
        `;
        i++;       
    }
    

    placeholder.innerHTML=out;
    for(let j=0;j<i;j++){
        temp = "open-chart"+j.toString();
        const openBtn = document.getElementById(temp);
        openBtn.addEventListener('click', () => {
        document.querySelector('.chart-container').style.display="block";
        document.querySelector('.overlay').style.display="block";
    })
    }
    cnt(tkBT);
}

displayTable(tkBT);

displayTable(tkBT);
const searchInput = document.querySelector("[data-search]")
searchInput.addEventListener("input", e => {
    const value = e.target.value;
    let a=[]
    tkBT.forEach(user => {
        const isVisible =
          (user.name.toLowerCase().includes(value.toLowerCase()) || user.id.toLowerCase().includes(value.toLowerCase()))
        if(isVisible){
            a.push(user);
        }
      })
    console.log(a)
    displayTable(a);
})

function cnt(tkBT){
    console.log(tkBT.length);
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
