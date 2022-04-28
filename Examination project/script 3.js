//----------------------------------------------------------VARIABLES-------------------------------------------------------------------------------------
var randomArray = [];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function setqQuestions() {
    randomArray = questions.sort(() => Math.random() - .5);// random the questions and put them in array 
}
//--------------------------------------------------------------VARIABLES---------------------------------------------------------------------------------
var qnumber = document.getElementsByClassName("question-number")[0];
var qtext = document.getElementsByClassName("question-text")[0];
var optionsConteiner = document.getElementsByClassName("option-container")[0];
var qcounter = 0;
var qcurrent;
var allOptionsArray = [];
var i = 0;
var ol;
var animationDelay;
var optionlist;
//-----------------------------------------------------------------------------------------------------------------------------------------------
function getNewQuestion(i) {
    //set question number
    qnumber.innerHTML = "Question " + (i + 1) + " of " + randomArray.length;
    //set question text
    qtext.innerHTML = randomArray[i].Body;
    // set options
    ol = randomArray[i].Choices.length;
    optionsConteiner.innerHTML = "";
    animationDelay = 0.2;
    for (var j = 0; j < ol; j++) {
        optionlist = document.createElement("div");
        optionlist.textContent = randomArray[i].Choices[j].Body;
        optionlist.id = j;
        optionlist.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.2;
        optionlist.className = "option";
        optionsConteiner.appendChild(optionlist);
        optionlist.setAttribute("onclick", "saveResult(this)");
    }
}
//--------------------------------------------------------------VARIABLES---------------------------------------------------------------------------------
var list = document.getElementsByClassName("option");
var studentAnswerd = [];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function saveResult(e) {
    for (var c = 0; c < list.length; c++) {
        list[c].classList.remove("choosed");
    }
    e.classList.add("choosed");
    studentAnswerd[qcounter - 1] = e.textContent;// save answers in array 
}
//----------------------------------------------------------------VARIABLES-------------------------------------------------------------------------------
var correctAnswer = 0;
var wrongAnswer = 0;
var final = [];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function correct() {
    for (var t = 0; t < studentAnswerd.length; t++) {
        if (studentAnswerd[t] === randomArray[t].RightAnwser) {
            final.push("true");
        }
    }//if the answer is true put true in array 
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function next() {

    previous.style.display = "block";
    console.log(studentAnswerd);
    if (qcounter === questions.length) {
        alert("exam over");
        examOver();
    }
    else if (qcounter < questions.length) {
        getNewQuestion(qcounter);
    }

    if (qcounter <= randomArray.length - 1) {
        qcounter++;
    }
    else {
        qcounter = randomArray.length;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i].textContent === studentAnswerd[qcounter - 1]) {
            list[i].style.backgroundColor = "rgb(121, 111, 118)";
        }
        else {
            list[i].style.backgroundColor = "rgb(238, 206, 245)";
        }
    }

}
//-----------------------------------------------------------------VARIABLES------------------------------------------------------------------------------
var q;
var pinMark = document.getElementById("pinMark");
//-----------------------------------------------------------------------------------------------------------------------------------------------
pinMark.addEventListener("click", function () {

if(markedArray[qcounter-1].style.backgroundColor==="rgb(207, 51, 200)"){
    markedArray[qcounter-1].style.backgroundColor="#2b162a";
}else{
    markedArray[qcounter-1].style.backgroundColor="rgb(207, 51, 200)";
}
});
//-----------------------------------------------------------------VARIABLES------------------------------------------------------------------------------
var previous = document.getElementById("previous");
//-----------------------------------------------------------------------------------------------------------------------------------------------
previous.addEventListener("click", function () {

    if (qcounter === 2) {
        previous.style.display = "none";
        getNewQuestion(qcounter - 2);
    }

    else if (qcounter <= randomArray.length && qcounter > 2) {
        getNewQuestion(qcounter - 2);
    }

    if (qcounter <= randomArray.length && qcounter > 2) {
        qcounter--;
    }
    else {
        qcounter = 1;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i].textContent === studentAnswerd[qcounter - 1]) {
            list[i].style.backgroundColor = "rgb(121, 111, 118)";
        }
        else {
            list[i].style.backgroundColor = "rgb(238, 206, 245)";
        }
    }

});
//-----------------------------------------------------------------------------------------------------------------------------------------------
function examOver() {
    examBox.classList.add("hide");
    ressultBox.classList.remove("hide");
    correct();
    examResult();
}
//--------------------------------------------------------------VARIABLES---------------------------------------------------------------------------------

var ressultBox = document.getElementsByClassName("result-box ")[0];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function examResult() {
    ressultBox.querySelector(".total-question").innerHTML = questions.length;
    ressultBox.querySelector(".total-correct").innerHTML = final.length;
    ressultBox.querySelector(".total-wrong").innerHTML = questions.length - final.length;
    var precent = (final.length / questions.length) * 100;
    ressultBox.querySelector(".percentage").innerHTML = precent.toFixed(2) + "%";
    ressultBox.querySelector(".total-score").innerHTML =
        final.length + " / " + questions.length;

}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function resetExam() {
    qcounter = 0;
    studentAnswerd = [];
    markedArray = [];
    randomArray = [];
    final = [];
    time = setmint * 60;
}
//-------------------------------------------------------------VARIABLES----------------------------------------------------------------------------------
var examBox = document.getElementsByClassName("exam-box")[0];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function tryagain() {
    ressultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetExam();
}
//---------------------------------------------------------------VARIABLES--------------------------------------------------------------------------------
var pincontaner = document.getElementsByClassName("pin")[0];
var markedArray = [];
//-----------------------------------------------------------------------------------------------------------------------------------------------
function mark() {
    pincontaner.innerHTML = "";
    for (var r = 0; r < questions.length; r++) {
        q = document.createElement("div");
        q.textContent = r + 1;
        q.id = r + 1;
        markedArray.push(q);
        pincontaner.appendChild(q);
        // q.setAttribute("onclick", "markedQuestion(this)");
    }
}
// function markedQuestion(e){
//     getNewQuestion(Number(e.textContent)-1) ;
//     console.log(e.textContent);
// }
//---------------------------------------------------------------VARIABLES--------------------------------------------------------------------------------
var setmint = 10;
var time = setmint * 60;
var count = document.getElementById("countDown");
//-----------------------------------------------------------------------------------------------------------------------------------------------
function start() {
    homeBox.classList.add("hide");
    examBox.classList.remove("hide");
    previous.style.display = "none";
    setqQuestions();
    getNewQuestion(0);
    qcounter = 1;
    mark();
    setInterval(function () {
        var min = Math.floor(time / 60);
        var sec = time % 60;
        if (sec < setmint) {
            "0" + sec;
        } else {
            sec;
        }
        count.innerHTML = min + ":" + sec;
        if (time === 0) {
            examOver();
        } else {
            time--;
        }
    }, 1000);

}
//---------------------------------------------------------------VARIABLES--------------------------------------------------------------------------------
var homeBox = document.getElementsByClassName("home-box")[0];
//-----------------------------------------------------------------------------------------------------------------------------------------------
window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = questions.length;
};
//-----------------------------------------------------------------------------------------------------------------------------------------------
function Answer(id, body) {
    this.ID = id;
    this.Body = body;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function question(id, body, right, choices) {
    this.ID = id;
    this.Body = body;
    this.RightAnwser = right;
    this.Choices = choices;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
var anwsers = [
    new Answer(0, "Creative Style Sheets"),
    new Answer(1, "Cascading Style Sheets"),
    new Answer(2, "Colorful Style Sheets"),
    new Answer(3, "Computer Style Sheets"),
    new Answer(4, "true"),
    new Answer(5, "false"),
    new Answer(6, "Strong Question Language"),
    new Answer(7, "Structured Query Language"),
    new Answer(8, "Structured Question Language"),
    new Answer(9, "The Marauder"),
    new Answer(10, "The Black Pearl"),
    new Answer(11, "The Black Python"),
    new Answer(12, "The relaxed duck"),
    new Answer(13, "A bag of lemons"),
    new Answer(14, "A handful of roses"),
    new Answer(15, "A box of chocolates"),
    new Answer(16, "A lollipop"),
    new Answer(17, "Ron Weasley"),
    new Answer(18, "Neville Longbottom"),
    new Answer(19, "Hermione Granger"),
    new Answer(20, "rahma salah"),
    new Answer(21, "Liam Payne"),
    new Answer(22, "hassan shakosh"),
    new Answer(23, "hmo beqa"),
    
];
//-----------------------------------------------------------------------------------------------------------------------------------------------
var questions = [
    new question(1,
        "What does CSS stand for?",
        "Cascading Style Sheets",
        [anwsers[0],
        anwsers[1],
        anwsers[2],
        anwsers[3]]
    ),
    new question(2, "3 + 4 = 7 ?", "true", [
        anwsers[4],
        anwsers[5]
    ]),
    new question(3, "What does SQL stand for?", "Structured Query Language", [
        anwsers[6],
        anwsers[7],
        anwsers[8],
    ]),
    new question(
        4, "In Pirates of the Caribbean, what was Captain Jack Sparrow's ship's name?", "The Black Pearl", [
        anwsers[9],
        anwsers[10],
        anwsers[11],
        anwsers[12]]
    ),
    new question(
        5,
        "According to Forrest Gump, “life was like…”",
        "A box of chocolates",
        [anwsers[13],
        anwsers[14],
        anwsers[15],
        anwsers[16]]
    ),
    new question(
        6,
        "Which one of these characters is not friends with Harry Potter?",
        "rahma salah",
        [anwsers[17],
        anwsers[18],
        anwsers[19],
        anwsers[20]]
    ),
    new question(
        7,
        "The British band One Direction was made up of Harry, Louis, Niall, Zayn, and…",
        "Liam Payne",
        [anwsers[21],
        anwsers[22],
        anwsers[23]]
    ),
    new question(8, "Marrakesh is the capital of Morocco", "false", [
        anwsers[4],
        anwsers[5],
    ]),
    new question(9, "10 + 4 = 13 ?", "false", [
        anwsers[4],
        anwsers[5]
    ]),
    new question(10, "30 + 4 = 34 ?", "true", [
        anwsers[4],
        anwsers[5]
    ]),
];
