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
    // REFACTOR: 결과 화면 html 태그 다시 짜야할듯(가시성 높게)
    name.innerHTML = `<h2>${infoList[grade].name}</h2>`;
    desc.innerHTML = infoList[grade].desc;
    /** ADDED:
     *  결과 이미지 src 지정 코드 추가
     */
    document.getElementById('res-img').src = infoList[grade].image
}