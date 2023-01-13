const startPage = document.querySelector('#start-page');
const qnaPage = document.querySelector('#qna-page');
const resultPage = document.querySelector('#result-page');
const progressBar = document.querySelector('.progress-bar');
const backBtn = document.querySelector('#back-btn')

let q = document.querySelector('.qBox');
let a = document.querySelector('.aBox');

const ENDPOINT = taste.length;    // 질문 수
const select = [];   // 선택한 답을 담을 배열

qnaPage.style.display = "none";
resultPage.style.display = "none";

function start() {
    let username = document.getElementById('username').value;
    // console.log(username);

    startPage.style.display = "none";
    qnaPage.style.display = "block";
    let qIdx = 0;
    goNext(qIdx);
}

function addAnswer(answerText, qIdx, aIdx){
    let answerBtn = document.createElement('button');

    answerBtn.classList.add('answerList', 'btn', 'btn-primary');
    a.appendChild(answerBtn);
    answerBtn.innerHTML = answerText;

    answerBtn.addEventListener("click",() => {
        let children = document.querySelectorAll('.answerList');

        // correct에 선택한 답의 index 값 저장
        select[qIdx] = aIdx; 

        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
}

function goNext(qIdx) {
    if(qIdx === ENDPOINT){
        goResult();
    }

    q.innerHTML = taste[qIdx].q.question;
    for(let i in taste[qIdx].a){
        addAnswer(taste[qIdx].a[i].answer, qIdx, i);
    }
    // 진행도 계산
    progressBar.style.width = (100/ENDPOINT) * (qIdx+1) + '%';

    backBtn.addEventListener("click", () => {
        let children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(--qIdx)
    })
}

