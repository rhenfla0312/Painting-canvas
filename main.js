// canvas = context를 갖고 있는 html의 요소다, 그 요소 안에서 픽셀을 다룬다

// 마우스는 항상 움직인다, 변수로 지정한 painting이 true이냐 false이냐에 따라 이벤트가 달라진다


const canvas = document.getElementById("jsConvas"); // 전체영역
const colors = document.getElementsByClassName("jsColor"); // 색상들
const range = document.getElementById("jsRange"); // input range
const mode = document.getElementById("jsMode"); // 채우기
const save = document.getElementById("jsSave"); // 저장

// context - element에서 픽셀들을 컨트롤한다
const ctx = canvas.getContext("2d"); // canvas context api

// 중복 -> 변수로 지정
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas size 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 최초 로드시에 배경색 지정
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
// context style 지정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

// context lineWidth 지정
// ctx.lineWidth = 2.5;
// 지정한 전체범위를 그린다, x,y,width,height를 지정한다
// ctx.fillRect(50,20,100,49);



// 조건문을 줄 변수 지정
// filling - true이면 화면 전체가 체워진다, false면 painting 모드로 그려진다
let filling = false;
// painting - 마우스를 누르거나 땔 때 이벤트 지정
let painting = false;



// 시작과 멈추는 이벤트 지정 
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 사용자가 마우스를 움직일 때
function onMouseMove(event) {
    // 해당 범위의 좌표 가져오기
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        // 클릭하지 않고 마우스를 움직였을 때 path를 시작한다, path = line
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // lintTo, stroke - 마우스를 움직이는 내내 발생한다
        // path의 전 위치부터 현 위치까지 그려준다
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}



if(canvas) {
    // 사용자가 해당 영역에서 마우스를 움직였을 때
    canvas.addEventListener("mousemove", onMouseMove);
    // 사용자가 마우스 버튼을 누를때
    canvas.addEventListener("mousedown", startPainting);
    // 사용자가 눌렀던 마우스를 땔 때
    canvas.addEventListener("mouseup", stopPainting);
    // 사용자가 해당 영역에서 마우스를 밖으로 옮길 때
    canvas.addEventListener("mouseleave", stopPainting);
    // 채우기
    canvas.addEventListener("click", handleCanvas);
    // 사용자가 마우스 우클릭을 했을 때
    canvas.addEventListener("contextmenu", handleCM);
}

// 마우스 우클릭 방지
function handleCM(event) {
    event.preventDefault();
}

// 채우기 지정 
function handleCanvas() {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    } else {

    }
}
// 색상 지정
function handleColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// Array.from() - object로부터 array를 만든다
Array.from(colors).forEach(color => color.addEventListener("click", handleColor))





// bar event
function handleRange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;

}

// 채우기 이벤트
function handleMode() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// 저장 이벤트
function handleSave() {
    // canvas 다운기능
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    // 만든 a태그에 image url 연결
    link.href = image;
    // a 속성 -> download -> href처럼 링크로 가는게 아닌 다운로드를 한다
    link.download = "image";
    link.click();
}

// bar
if(range) {
    range.addEventListener("input", handleRange);
}

// 채우기
if(mode) {
    mode.addEventListener("click", handleMode);
}

// 저장
if(save) {
    save.addEventListener("click", handleSave);
}