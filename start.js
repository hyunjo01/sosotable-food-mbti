const startPage = document.querySelector('#start-page')
const qnaPage = document.querySelector('#qna-page')
const resultPage = document.querySelector('#result-page')
const progressBar = document.querySelector('.progress-bar')

const endPoint = 12;
const select = [];

qnaPage.style.display = "none";
resultPage.style.display = "none";

/**MARK
 * eipoint: E/I를 결정하는 변수
 * snpoint: S/N를 결정하는 변수
 * ftpoint: F/T를 결정하는 변수
 * pjpoint: P/J를 결정하는 변수
 * 각 질문의 첫번째 답변을 E, S, F, P로.
 * 각 포인트가 5이하면 두 개중 앞 부분의 엠비티아이로 결정.
 */
let eipoint = 0;
let snpoint = 0;
let ftpoint = 0;
let pjpoint = 0;


/**ADDED
 * 
 * @param {*} answerText1 답변1
 * @param {*} answerText2 답변2 추가. 답변 두 개를 한번에 받아옴
 * @param {*} qIdx 
 * 답변1과 답변2 처리를 한번에 하게 수정.
 */
function addAnswer(answerText1, answerText2, qIdx){
    var a = document.querySelector('.aBox');
    var answer1 = document.createElement('button');
    var answer2 = document.createElement('button');
    answer1.classList.add('answerList');
    answer2.classList.add('answerList');
    a.appendChild(answer1);
    a.appendChild(answer2);
    answer1.innerHTML = answerText1;
    answer2.innerHTML = answerText2;
    

    /** ADDED
     * 첫번째 답변 클릭하면
     * 답변의 타입 확인하고
     * 타입에 맞는 point에 첫번째 답변 score가 더해짐.
     */
    answer1.addEventListener("click",() => {

        if (qnaList[qIdx].q.type == "EI") {
            eipoint += qnaList[qIdx].a[0].score;
            //console.log("실행")
            //console.log(qnaList[qIdx].a[0].score)
            //console.log(eipoint)
        }
        else if (qnaList[qIdx].q.type == "SN") {
            snpoint += qnaList[qIdx].a[0].score;
        }
        else if (qnaList[qIdx].q.type == "FT") {
            ftpoint += qnaList[qIdx].a[0].score;
        }
        else if (qnaList[qIdx].q.type == "PJ") {
            pjpoint += qnaList[qIdx].a[0].score;
        }



        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){            
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
    /**ADDED if문
     * 첫번째 답변 클릭하면
     * 답변의 타입 확인하고
     * 타입에 맞는 point에 첫번째 답변 score가 더해짐.
     */
    answer2.addEventListener("click",() => {
        if (qnaList[qIdx].q.type == "EI") {
            eipoint += qnaList[qIdx].a[1].score;
            //console.log("실행")
            //console.log(qnaList[qIdx].a[1].score)
        }
        else if (qnaList[qIdx].q.type == "SN") {
            snpoint += qnaList[qIdx].a[1].score;
        }
        else if (qnaList[qIdx].q.type == "FT") {
            ftpoint += qnaList[qIdx].a[1].score;
        }
        else if (qnaList[qIdx].q.type == "PJ") {
            pjpoint += qnaList[qIdx].a[1].score;
        }

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

let point;
let grade;

function goNext(qIdx) {
    if(qIdx === endPoint){
        point = defpoint();/**ADDED 결과페이지로 넘어갈 때 최종 point 정하는 코드*/
        grade = sortResult(point);/**ADDED 결과페이지로 넘어갈 때 최종 grade 정하는 코드*/
        goResult();
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q.question;
    addAnswer(qnaList[qIdx].a[0].answer, qnaList[qIdx].a[1].answer, qIdx); /**ADDED qnaList 두번째 답변이랑 qIdx도 같이 보냄. */

    // 진행도 계산
    progressBar.style.width = (100/endPoint) * (qIdx+1) + '%';
}

/** MARK
 * 포인트가 5이하면 앞에 있는 엠비티아이로 설정.
 * @returns 정해진 엠비티아이 4개를 합친 string return.
 */
function defpoint() {

    let EI;
    if (eipoint <5) EI = "E"
    else EI = "I"
    let SN;
    if (snpoint <5) SN = "S"
    else SN = "N"
    let FT;
    if (ftpoint <5) FT = "F"
    else FT = "T"
    let PJ;
    if (pjpoint <5) PJ = "P"
    else PJ = "J"

    //console.log(eipoint)

    return (EI + SN + FT + PJ)
}

/**MARK
 * 완성된 엠비티아이에 맞는 등급 설정. 
 * infoList 순서에 맞춰서 설정.
 */
function sortResult(point) {
    let num = 0;
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
    //console.log(num)
    return num;
}