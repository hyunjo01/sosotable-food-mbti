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
    // LEGACY:
    // var a = document.querySelector('.aBox');
    // var answer = document.createElement('button');

    // ADDED:
    // 리스트 아이템 추가
    var ul = document.querySelector('.list-group');
    let answer = document.createElement('list');
    answer.classList.add('answerList', 'list-group-item');
    ul.appendChild(answer)

    // LEGACY:
    // a.appendChild(answer);

    answer.innerHTML = answerText;
    answer.addEventListener("click", () => {
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    });

    // ADDED:
    // 리스트 아이템 마우스이벤트 리스너 추가
    answer.addEventListener("mouseover", () => { 
        answer.classList.add('active')
    });
    answer.addEventListener("mouseout", () => {
        answer.classList.remove('active')
    });
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

    // ADDED
    // button이 아닌 bootstrap list의 사용은 어떨까요?
    let list = document.createElement('ul')
    list.classList.add('list-group', 'list-group-flush')
    var a = document.querySelector('.aBox');
    a.appendChild(list);
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}

