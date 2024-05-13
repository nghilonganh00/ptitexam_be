const jwt = localStorage.getItem("jwt");
var user_id = localStorage.getItem("user_id");
async function fetchInfo() {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            };
            const response = await fetch("http://localhost:8080/user/getResult?user_id="+ user_id.toString(),requestOptions)
            const exam = await response.json();
            console.log(exam);
            return exam;
        } catch (error) {
            console.log(error);
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
              (user.exam_title.toLowerCase().includes(value.toLowerCase()) || user.exam_id.toString().includes(value.toLowerCase()))
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
                <td class="cot-1"> ${baithi.exam_id}</td>
                <td class="cot-2">${baithi.exam_title}</td>
                <td class="cot-1">${baithi.start_time}</td>
                <td class="cot-1">${baithi.score.toFixed(2)}</td>
                <td class="cot-1">
                    <a class="open-result" href="/student/result?resultId=${baithi.id}">
                        <i class="fa-regular fa-newspaper"></i>
                    </a>
                </td>
            </tr>
        `;
        i++;       
    }
    

    placeholder.innerHTML=out;
    cnt(tkBT);
}



function cnt(tkBT){
    document.getElementById("cnt-exam").value= tkBT.length.toString();
}



// document.getElementById('overlay').addEventListener('click', ()=>{
//     document.querySelector('.chart-container').style.display="none";
//     document.querySelector('.overlay').style.display="none";
// })



function DangXuat(){
    localStorage.clear();
}