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