const startPage = document.querySelector('#start-average-page')
const qnaPage = document.querySelector('#qna-average-page')
const resultPage = document.querySelector('#result-average-page')
const progressBar = document.querySelector('.progress-bar')
const endPoint = 10

qnaPage.style.display = "none";
resultPage.style.display = "none";


//function addAnswer(qIdx){
    /*const a = document.querySelector('.aBox');
    const next = document.createElement('button');
    next.classList.add('answerList', 'btn');
    a.appendChild(next);
    next.innerHTML = "다음";
    


    next.addEventListener("click",() => {
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){            
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        let answ = document.getElementById(".aBox");
        console.log("aBox: " + answ);
        goNext(++qIdx);
    }, false);*/
//}


function start() {
    startPage.style.display = "none";
    qnaPage.style.display = "block";
    let qIdx = 0;
    goNext(qIdx);
}


function goNext(qIdx) {
    if(qIdx === endPoint){
        //point = defpoint();
        //grade = sortResult(point);
        goResult();
    }

    const q = document.querySelector('.qBox');
    q.innerHTML = average[qIdx].q.question;

    const a = document.querySelector(".aBox");
    const val = document.querySelector(".form-control");
    const next = document.querySelector(".input-group-append")

    next.addEventListener("click",() => {
        console.log("value: " + val.value);
        const value = val.value;
        console.log("value: " + value);
        average[qIdx].a = value;
        console.log("save: " + average[qIdx].a);
        goNext(++qIdx);
        val.value = null
    }, false);
    


    progressBar.style.width = (100/endPoint) * (qIdx+1) + '%';
}