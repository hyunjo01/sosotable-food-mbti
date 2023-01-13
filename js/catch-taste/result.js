let resultBox = document.querySelector('.resultBox');

function goResult() {
    qnaPage.style.display = "none";
    resultPage.style.display = "block";
    addResult();
}

function addResult() {
    let resultQnaBox = document.createElement('div')[taste.length];
    let qBox = document.createElement('div')[taste.length];
    let aBox = document.createElement('div')[taste.length];
    let answerBtn = document.createElement('button');
    answerBtn.classList.add('btn', 'btn-primary');

    for(let qIdx = 0; qIdx++; qIdx < taste.length){
        qBox[qIdx].innerHTML = taste[qIdx].q.question;

        for(let aIdx=0; aIdx++; aIdx < taste[qIdx].a.length){
            answerBtn.innerHTML = taste[qIdx].a[aIdx].answer;
            aBox[qIdx].appendChild(answerBtn);
        }
        resultQnaBox[qIdx].append(qBox[qIdx], aBox[qIdx]);
        
        resultBox.appendChild(resultQnaBox[qIdx]);
    }

    /*
    for(let aIdx = 0; aIdx++; aIdx < taste[0].a.length){
        let answerBtn = document.createElement('button');
        
        answerBtn.classList.add('answerList', 'btn', 'btn-primary');
        answerBtn.innerHTML = taste[0].a[aIdx].answer;
        aBox.appendChild(answerBtn);

    }
    */


}