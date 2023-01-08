const startPage = document.querySelector('#start-page')
const qnaPage = document.querySelector('#qna-page')
const resultPage = document.querySelector('#result-page')
const endPoint = 12;


const calcScore = () => {
    let eipoint = 0;
    for (let i = 0; i < endPoint; i++) {
        if (qnaList[i].q.type == "EI") 
        {
            eipoint += qnaList[i].a[select[i]].score;
        }
    }
    let EI;
    if (eipoint <5) EI = "I"
    else EI = "E"


    let snpoint = 0;
    for (let i = 0; i < endPoint; i++) {
        if (qnaList[i].q.type == "SN") 
        {
            snpoint += qnaList[i].a[select[i]].score;
        }
    }
    let SN;
    if (snpoint <5) SN = "S"
    else SN = "N"


    let ftpoint = 0;
    for (let i = 0; i < endPoint; i++) {
        if (qnaList[i].q.type == "FT") 
        {
            ftpoint += qnaList[i].a[select[i]].score;
        }
    }
    let FT;
    if (ftpoint <5) FT = "F"
    else FT = "T"


    let pjpoint = 0;
    for (let i = 0; i < endPoint; i++) {
        if (qnaList[i].q.type == "PJ") 
        {
            pjpoint += qnaList[i].a[select[i]].score;
        }
    }
    let PJ;
    if (pjpoint <5) PJ = "P"
    else PJ = "J"

    let point = EI + SN + FT + PJ

    return point;
    console.log("point: " + point)
}

const sortResult = (point) => {
    let num;
    if (point == "ESTJ") {
      num = 0;
    } else if (point == "ISTJ") {
      num = 1;
    } else if (point == "ENTJ") {
      num = 2;
    } else if (point == "INTJ") {
      num = 3;
    } else if (point == "ESFJ") {
      num = 4;
    } else if (point == "ISFJ") {
        num = 5;
    } else if (point == "ENFJ") {
        num = 6;
    } else if (point == "INFJ") {
        num = 7;
    } else if (point == "ESTP") {
        num = 8;
    } else if (point == "ISTP") {
        num = 9;
    } else if (point == "ENTP") {
        num = 10;
    } else if (point == "INTP") {
        num = 11;
    } else if (point == "ESFP") {
        num = 12;
    } else if (point == "ISFP") {
        num = 13;
    } else if (point == "ENFP") {
        num = 14;
    } else if (point == "INFP") {
        num = 15;
    }
    return num;
    console.log("num: " + num)
}

const point = calcScore();
const grade = sortResult(point);


qnaPage.style.display = "none";
resultPage.style.display = "none";

function addAnswer(answerText, qIdx){
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click",() => {
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
}

function start() {
    startPage.style.display = "none";
    qnaPage.style.display = "block";
    let qIdx = 0;
    goNext(qIdx);
}

function goNext(qIdx) {
    if(qIdx === endPoint){
        goResult();
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q.question;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}

/**
 * MARK
 * 결과 창 넘어가는 함수
 */
function goResult() {
    qnaPage.style.display = "none";
    resultPage.style.display = "block";
    addResult(grade)
}
/**
 * MARK
 * 결과 값 창에 띄우는 함수
 */
function addResult(grade) {
    let name = document.querySelector('.nameBox');
    let desc = document.querySelector('.descBox');
    name.innerHTML = infoList[grade].name;
    desc.innerHTML = infoList[grade].desc;
}

