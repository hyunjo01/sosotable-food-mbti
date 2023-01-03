const startPage = document.querySelector('#start-page')
const qnaPage = document.querySelector('#qna-page')
const resultPage = document.querySelector('#result-page')
const endPoint = 4;

qnaPage.style.display = "none";
resultPage.style.display = "none";

function goResult() {
    qnaPage.style.display = "none";
    resultPage.style.display = "block";
}

function addAnswer(answerText, qIdx){
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click",function(){
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

