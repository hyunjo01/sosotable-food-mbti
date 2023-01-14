const startPage = document.querySelector('#start-page')
const qnaPage = document.querySelector('#qna-page')
const progressBar = document.querySelector('.progress-bar')

const a = document.querySelector('.aBox');
const q = document.querySelector('.qBox');

const backBtn = document.querySelector('#back-btn')

// MARK: qIdx 전역 지정에 따라 전역 범위에서 backBtn 이벤트 리스너 지정
backBtn.addEventListener("click", () => {
    let children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
        children[i].disabled = true;
        children[i].style.display = 'none';
    }
    result.pop()
    goNext(--qIdx)
})

// MARK: 결과 post 요청을 보낼 body
let result = []
// MARK: 라우팅 경로에 따라 다르게 지정되는 qnaList 객체
let qnaList = {}

qnaPage.style.display = "none";

/** REFACTOR:
 * - 페이지별 대응받기 위해 인자로 입력받도록 함
 * - 함수 스코프 문제로 에러 발생, 전역으로 지정
 * */
let endPoint = Number
let qIdx = 0
/**LEGACY:
 * 서버사이드에서 처리하도록 하세요
 * */
// /**MARK
//  * eipoint: E/I를 결정하는 변수
//  * snpoint: S/N를 결정하는 변수
//  * ftpoint: F/T를 결정하는 변수
//  * pjpoint: P/J를 결정하는 변수
//  * 각 질문의 첫번째 답변을 E, S, F, P로.
//  * 각 포인트가 5이하면 두 개중 앞 부분의 엠비티아이로 결정.
//  */
// let eipoint = 0;
// let snpoint = 0;
// let ftpoint = 0;
// let pjpoint = 0;
//
// let point, grade;

function addAnswer(aIdx){
    const answer = qnaList[qIdx].a[aIdx]
    const answerText = answer.answer
    let answerBtn = document.createElement('button');

    answerBtn.classList.add('answerList', 'btn');
    a.appendChild(answerBtn);
    answerBtn.innerHTML = answerText;

    answerBtn.addEventListener("click",() => {
        let children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        // MARK: 요청 body 정보 저장
        result.push({
            score: answer.score,
            type: qnaList[qIdx].type
        })
        goNext(++qIdx);
    }, false);
    /** LEGECY:
     * 서버사이드에서 처리하도록 하세요
     * */
    // /** ADDED
    //  * 첫번째 답변 클릭하면
    //  * 답변의 타입 확인하고
    //  * 타입에 맞는 point에 첫번째 답변 score가 더해짐.
    //  */
    // /** TODO:
    //  * 이벤트 리스너 등록 foreach등의 반복문 사용하여 등록해 보세요
    //  **/
    // answer1.addEventListener("click",() => {
    //     if (mbtiQnaList[qIdx].q.type == "EI") {
    //         eipoint += mbtiQnaList[qIdx].a[0].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "SN") {
    //         snpoint += mbtiQnaList[qIdx].a[0].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "FT") {
    //         ftpoint += mbtiQnaList[qIdx].a[0].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "PJ") {
    //         pjpoint += mbtiQnaList[qIdx].a[0].score;
    //     }
    //
    //     var children = document.querySelectorAll('.answerList');
    //     for(let i = 0; i < children.length; i++){
    //         children[i].disabled = true;
    //         children[i].style.display = 'none';
    //     }
    //     goNext(++qIdx);
    // }, false);
    // /**ADDED if문
    //  * 첫번째 답변 클릭하면
    //  * 답변의 타입 확인하고
    //  * 타입에 맞는 point에 첫번째 답변 score가 더해짐.
    //  */
    // answer2.addEventListener("click",() => {
    //     if (mbtiQnaList[qIdx].q.type == "EI") {
    //         eipoint += mbtiQnaList[qIdx].a[1].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "SN") {
    //         snpoint += mbtiQnaList[qIdx].a[1].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "FT") {
    //         ftpoint += mbtiQnaList[qIdx].a[1].score;
    //     }
    //     else if (mbtiQnaList[qIdx].q.type == "PJ") {
    //         pjpoint += mbtiQnaList[qIdx].a[1].score;
    //     }
    //
    //     var children = document.querySelectorAll('.answerList');
    //     for(let i = 0; i < children.length; i++){
    //         children[i].disabled = true;
    //         children[i].style.display = 'none';
    //     }
    //     goNext(++qIdx);
    // }, false);
}

/** ADDED: 주관식 답변이 요구되는 경우 input form을 제작하여 사용
*/
function askAnswer() {
    const askForm = document.createElement('div');
    const inputForm = document.createElement('input')
    const buttonDiv = document.createElement('div')
    const button = document.createElement('button')
    askForm.className = 'input-group mb-3 answerList';
    inputForm.type = 'text';
    inputForm.className = 'form-control'
    inputForm.placeholder = '입력';
    buttonDiv.className = 'input-group-append'
    button.className = 'btn'
    button.innerText = '다음'
    buttonDiv.appendChild(button)
    askForm.appendChild(inputForm)
    askForm.appendChild(buttonDiv)
    button.addEventListener("click",() => {
        let children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        // MARK: 전송 객체 정보 저장
        result.push({
            score: inputForm.value
        })
        goNext(++qIdx);
    }, false);
    a.appendChild(askForm)
}

function start(point, type) {
    /** MARK:
     * 하나의 view로 다양한 라우팅을 처리하기 위해 라우팅 path에 따라 model객체를 지정
     * */
    switch (type) {
        case 'mbti': qnaList = mbtiQnaList; break;
        case 'taste': qnaList = tasteQnaList; break;
        case 'average': qnaList = averageQnaList; break;
    }
    endPoint = parseInt(point)
    startPage.style.display = "none";
    qnaPage.style.display = "block";
    goNext()
}

function goNext() {
    if(qIdx === endPoint) {
        /**LEGACY:
         * 서버사이드에서 처리하도록 하세요
         * point = defpoint();/**ADDED 결과페이지로 넘어갈 때 최종 point 정하는 코드
         * grade = sortResult(point);/**ADDED 결과페이지로 넘어갈 때 최종 grade 정하는 코드
         * */
        goResult();
    }
    else {
        q.innerHTML = qnaList[qIdx].q;
        if(qnaList[qIdx].a === undefined) {
            /** MARK:
             * 주관식 답변이 요구되는 경우
             * */
            askAnswer()
        }
        else {
            /** MARK:
             * 객관식 답변이 요구되는 경우
             * */
            for(let i in qnaList[qIdx].a){
                addAnswer(i);
            }
        }
        // MAKR: 진행도 계산
        progressBar.style.width = (100/endPoint) * (qIdx+1) + '%';
    }
}

/**
 * MARK:
 * 결과 창 넘어가는 함수
 * 하나의 페이지에서 결과를 처리하지 않고
 * 데이터를 서버로 보낸 후 서버사이드에서 처리하도록 해요
 */
function goResult() {
    const form = document.createElement('form')
    const input_value = document.createElement('input')
    // MARK: result 페이지로 result json을 담은 post요청을 보낼 것
    form.action = 'result.html'
    form.method = 'post'
    input_value.type = 'hidden'
    input_value.name = 'result'
    input_value.value = JSON.stringify(result)
    form.appendChild(input_value)

    document.querySelector('main').appendChild(form)
    form.submit()
}

/** LEGACY:
 * 서버사이드에서 처리하도록 하세요
 */
// /**
//  * MARK
//  * 결과 값 창에 띄우는 함수
//  */
// function addResult(grade) {
//     let name = document.querySelector('.nameBox');
//     let desc = document.querySelector('.descBox');
//     name.innerHTML = mbtiResultList[grade].name;
//     desc.innerHTML = mbtiResultList[grade].desc;
// }

/**LEGACY:
 * 서버사이드에서 처리하도록 하세요
 * */
// /** MARK
//  * 포인트가 5이하면 앞에 있는 엠비티아이로 설정.
//  * @returns 정해진 엠비티아이 4개를 합친 string return.
//  */
// function defpoint() {
//
//     let EI;
//     if (eipoint <5) EI = "E"
//     else EI = "I"
//     let SN;
//     if (snpoint <5) SN = "S"
//     else SN = "N"
//     let FT;
//     if (ftpoint <5) FT = "F"
//     else FT = "T"
//     let PJ;
//     if (pjpoint <5) PJ = "P"
//     else PJ = "J"
//
//     //console.log(eipoint)
//
//     return (EI + SN + FT + PJ)
// }
//
// /**MARK
//  * 완성된 엠비티아이에 맞는 등급 설정.
//  * infoList 순서에 맞춰서 설정.
//  */
// function sortResult(point) {
//     let num = 0;
//     if (point == "ESTJ") {
//       num = 0;
//     } else if (point == "ISTJ") {
//       num = 1;
//     } else if (point == "ENTJ") {
//       num = 2;
//     } else if (point == "INTJ") {
//       num = 3;
//     } else if (point == "ESFJ") {
//       num = 4;
//     } else if (point == "ISFJ") {
//         num = 5;
//     } else if (point == "ENFJ") {
//         num = 6;
//     } else if (point == "INFJ") {
//         num = 7;
//     } else if (point == "ESTP") {
//         num = 8;
//     } else if (point == "ISTP") {
//         num = 9;
//     } else if (point == "ENTP") {
//         num = 10;
//     } else if (point == "INTP") {
//         num = 11;
//     } else if (point == "ESFP") {
//         num = 12;
//     } else if (point == "ISFP") {
//         num = 13;
//     } else if (point == "ENFP") {
//         num = 14;
//     } else if (point == "INFP") {
//         num = 15;
//     }
//     //console.log(num)
//     return num;
// }