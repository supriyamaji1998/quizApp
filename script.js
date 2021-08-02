
console.log("i am in js");
const rulebox = document.querySelector(".ruleBox");
const backBtn = document.querySelector(".buttons .back");
const nextbtn = document.querySelector(".buttons .next");
const quiz_box = document.querySelector(".quiz_box");
const timerSec = document.querySelector(".timerSec");
const progressTime = document.querySelector("header .progressTime");
function userName(e) {
  e.preventDefault();
  let userIn = document.querySelector("input").value;
  if (userIn == "") {
    alert("Please Enter Your Name");
  } else {
    sessionStorage.setItem("username", userIn);
    document.querySelector("input").value = "";
    rulebox.classList.add("activerule");
  }
  console.log(userIn);
  console.log("hi");
}
backBtn.onclick = () => {
  rulebox.classList.remove("activerule");
};
nextbtn.onclick = () => {
  rulebox.classList.remove("activerule");
  quiz_box.classList.add("activeques");
  let name = sessionStorage.getItem("username");
  document.querySelector(".title").innerHTML = `Welcome !!! ${name}`;
  questionRen(0);
  startTimer(20);
  progressTimer(0);
  document.querySelector( ".countques").innerHTML = `<span>You have visited  <p>1</p>of<p>15</p></span>`;
};

let que_count = 0;
let timeDur=20;
let score=0;
let counter;
let counterPro;
const nextQue = quiz_box.querySelector(".next-btn");
nextQue.onclick = () => {
  console.log(que_count);
  if (que_count < quiz.length - 1) {
    que_count++;
    questionRen(que_count);
    clearInterval(counter);
    startTimer(timeDur);
    clearInterval(counterPro);
    progressTimer(0);
    document.querySelector(
      ".countques"
    ).innerHTML = `<span>You have visited  <p>${
      que_count + 1
    }</p>of<p>15</p></span>`;
  } else {
    clearInterval(counter);
    clearInterval(counterPro);
    que_count=0;
    showResultBox();
    console.log("complete");
  }
};

function startTimer(time){
  const optionText = document.querySelector(".option");
  let alloption=optionText.children.length;
  timerSec.innerHTML=20;
  counter=setInterval(function(){
    if(time-1<=0){
    clearInterval(counter);

    let correctAns=quiz[que_count].answer;
    let alloption=optionText.children.length;

    for(let i=0;i<alloption;i++){
      if(optionText.children[i].innerText==correctAns){
          optionText.children[i].setAttribute("class","optionItem correct");
          optionText.children[i].insertAdjacentHTML("beforeend",righticon);
      }
  }
    for(let i=0;i<alloption;i++){
    optionText.children[i].classList.add("disable");
    }
      console.log("wprking inside");
    }
    timerSec.innerHTML=time-1;
    time--;
  },1000)
}
let widthofquizbox=document.querySelector(".quiz_box").offsetWidth;
function progressTimer(time){
 
  counterPro=setInterval(function(){
    time+=1;
    progressTime.style.width=time+"px";
    if(time>widthofquizbox){
      clearInterval(counterPro);
    }
  },widthofquizbox/20+8)
}

let righticon= '<div class="icon tick"><i class="fas fa-check"></i></div>';
let wrongicon= '<div class="icon cross"><i class="fas fa-times"></i></div>';
function questionRen(index) {
    const quesText = document.querySelector(".ques");
  quesText.innerHTML = `${quiz[index].question}`;
  const optionText = document.querySelector(".option");
  optionText.innerHTML = `<div class="optionItem">
    <span>${quiz[index].options[0]}</span>
  </div>
<div class="optionItem">
    <span>${quiz[index].options[1]}</span>
  </div>
<div class="optionItem">
    <span>${quiz[index].options[2]}</span>
  </div>
<div class="optionItem">
    <span>${quiz[index].options[3]}</span>
  </div>`;



const optionList=optionText.querySelectorAll(".optionItem");
  for(let i=0;i<optionList.length;i++){
      optionList[i].setAttribute("onclick","optionSelected(this)")
  }
}

function optionSelected(select){
    const optionText = document.querySelector(".option");
    let userAns=select.innerText;
    let correctAns=quiz[que_count].answer;
    let alloption=optionText.children.length;
    clearInterval(counter);
    clearInterval(counterPro);
    if(userAns==correctAns){
        select.classList.add("correct");
        select.insertAdjacentHTML("beforeend",righticon);
        score++;
        console.log(correctAns);
    }else{
        select.classList.add("incorrect");
        select.insertAdjacentHTML("beforeend",wrongicon);
        for(let i=0;i<alloption;i++){
            if(optionText.children[i].innerText==correctAns){
                optionText.children[i].setAttribute("class","optionItem correct");
                optionText.children[i].insertAdjacentHTML("beforeend",righticon);
            }
        }
    }
    
    for(let i=0;i<alloption;i++){
        optionText.children[i].classList.add("disable");
        // console.log("wprking");
    }
    console.log(userAns);
    console.log(correctAns);
}

const result_box=document.querySelector(".result");
const restartquiz=document.querySelector(".resBtn .restart");
const quit =document.querySelector(".quit");
quit.onclick=()=>{
  window.location.reload();
}

function showResultBox(){
  rulebox.classList.remove("activerule");
  quiz_box.classList.remove("activeques");
  result_box.classList.add("activeResult");
  console.log("running")
  let resText=document.querySelector(".resultTxt");
  resText.innerHTML=` <span>You got <p> &nbsp; ${score} &nbsp; </p> out of <p> &nbsp; 15</p></span>`
}
restartquiz.onclick=()=>{
  result_box.classList.remove("activeResult");
  quiz_box.classList.add("activeques");
   que_count = 0;
  let timeDur=20;
  let score=0;
  let counter;
  document.querySelector(
    ".countques"
  ).innerHTML = `<span>You have visited  <p>1 </p>of<p>15</p></span>`;
  console.log(que_count)
    questionRen(que_count);
    clearInterval(counter);
    startTimer(timeDur);
    clearInterval(counterPro);
    progressTimer(0);
}