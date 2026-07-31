let questions = [];
  

let current = 0;

let status = [];

function createNavigator(){

let nav=document.getElementById("navigator");

nav.innerHTML="";


questions.forEach(function(q,index){

let button=document.createElement("button");

button.innerHTML=index+1;

button.className="navButton " + status[index];


button.onclick=function(){

current=index;

showQuestion();

};


nav.appendChild(button);


});

}

function showQuestion(){

document.getElementById("counter").innerHTML =
"Question " + (current+1) + " of " + questions.length;

document.getElementById("question").innerHTML =
questions[current].question;

let answers = document.getElementById("answers");

answers.innerHTML="";

questions[current].options.forEach(function(option,index){

let button=document.createElement("button");

button.className="option";

button.innerHTML = option;

button.onclick=function(){

if(index === questions[current].answer){

button.classList.add("correct");

status[current]="correct";

}else{

button.classList.add("wrong");

status[current]="wrong";

}

createNavigator();

};

answers.appendChild(button);

});

}


document.getElementById("nextBtn").onclick=function(){

if(current < questions.length-1){

current++;

showQuestion();

}

};


document.getElementById("prevBtn").onclick=function(){

if(current > 0){

current--;

showQuestion();

}

};


document.getElementById("skipBtn").onclick=function(){

status[current]="skipped";

if(current < questions.length-1){

current++;

showQuestion();

}

createNavigator();

};


loadQuestions();


async function loadQuestions(){

let subjectFile = localStorage.getItem("subjectFile");

let subjectName = localStorage.getItem("subjectName");


if(!subjectFile){

subjectFile = "AirLaw";

subjectName = "Air Law";

}


let response = await fetch("data/" + subjectFile + ".json");


questions = await response.json();

status = new Array(questions.length).fill("notAttempted");

createNavigator();

showQuestion();


}