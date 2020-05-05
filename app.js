const canvas = document.getElementById("jsCanvas"); //<canvas id="jsCanvas" class="canvas"></canvas>
const ctx = canvas.getContext("2d"); //2d상태의 캔버스
const colors = document.getElementsByClassName("jsColor"); //색깔 div 9개 전부 가져옴
const range = document.getElementById("jsRange"); //input 태그 가져옴
const mode = document.getElementById("jsMode"); //Fill 버튼 가져옴
const saveBtn = document.getElementById("jsSave"); //Save 버튼 가져옴

const INITIAL_COLOR = "#2c2c2c" //초기 색깔: 검정
const CANVAS_SIZE = 700; //캔버스 크기

canvas.width = CANVAS_SIZE //캔버스 너비: 700
canvas.height = CANVAS_SIZE //캔버스 높이: 700

ctx.fillStyle = "white"; //채우기 색: 흰색
ctx.fillRect(0, 0, canvas.width, canvas.height); //처음에 바탕 흰색으로 채움
ctx.strokeStyle = INITIAL_COLOR; //기본 선 색: 검정색
ctx.fillStyle - INITIAL_COLOR;//기본 채우기 색: 검정색
ctx.lineWidth = 2.5; //기본 선 두께: 2.5

let painting = false; //default: 그림 그려지지 않는 상태
let filling = false; //default: paint

function stopPainting() { //마우스 클릭 떼거나, 캔버스밖으로 나갈때
    painting = false; //그림 그려지는 것 멈춤
}

function startPainting() { //마우스가 클릭 상태일 때 
    painting = true; //그림 그리기
}

function onMouseMove(event) { //마우스를 움직이면
    const x = event.offsetX; //캔버스 x좌표
    const y = event.offsetY; //캔버스 y좌표
    if(!painting) { //painting : false
        ctx.beginPath(); //경로 그리기 시작
        ctx.moveTo(x, y); //좌표로 경로를 그리지 않고 이동
    } else { //painting : true
        ctx.lineTo(x, y); //경로를 그리며 좌표로 이동
        ctx.stroke(); //패스의 선을 그음
    }
}

function handleColorClick(event) { //색깔들을 클릭했을 때 
    const color = event.target.style.backgroundColor; //color=클릭한 것의 backgroundcolor
    ctx.strokeStyle = color; //그리기 색을 클릭한 색으로 바꿔줌
    ctx.fillStyle = color;
}

function handleRangeChange(event) { //바에 이동이 생길 때
    const size = event.target.value; //size=0.1~5.0 사이의 값
    ctx.lineWidth = size; //size를 선 두께로 설정
}

function handleModeClick(event) { //모드 버튼을 클릭했을 때
    if(filling == true) { //paint 표시(fill)
        filling = false; //paint 실행
        mode.innerText = "Fill"; //fill 표시(paint)
    } else { //fill 표시(paint)
        filling = true; //fill 실행
        mode.innerText = "Paint"; //paint 표시(fill)
    }
}

function handleCanvasClick() { //캔버스를 클릭했을 때
    if(filling) { //filling: true
        ctx.fillRect(0, 0, canvas.width, canvas.height); //캔버스 전체에 색깔 채우기
    }
}

function handleCM(event) { //오른쪽 클릭 할때
    event.preventDefault(); //메뉴기능 막음
}

function handleSaveClick() { //save버튼 클릭할 때
    const image = canvas.toDataURL(); //canvas의 그림을 png주소로 변환 후 image에 저장
    const link = document.createElement("a"); //<a></a>태그를 만들어 link에 저장
    link.href = image; //link의 a태그에 href를 image 주소로 저장
    link.download = "PaintJS[👩‍🎨]"; //link의 a태그의 제목을 저장
    link.click(); //save버튼 클릭하면 link가 자동으로 클릭되어 이미지 저장됨
}

if(canvas) { //캔버스가 존재한다면
    canvas.addEventListener("mousemove", onMouseMove); //마우스를 움직이면 x,y좌표 읽음
    canvas.addEventListener("mousedown", startPainting); //마우스를 클릭할때 painting: true
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭을 뗄때 painting: false
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스 바깥으로 나갈 때 painting: false
    canvas.addEventListener("click", handleCanvasClick); //fill: true 상태에서 마우스를 클릭했을 때 색깔 채워짐
    canvas.addEventListener("contextmenu", handleCM); //오른쪽 클릭으로 메뉴 열지 못하게 함(우클릭 방지)
}
//colors로 부터 배열을 만들고, 배열의 각각 내용마다 click했을 때 이벤트를 하게 한다.
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));
//range가 존재한다면 입력이 있을때 이벤트 실행
if(range) {
    range.addEventListener("input", handleRangeChange);
}
//mode가 존재한다면 클릭할 때 이벤트 실행
if(mode) {
    mode.addEventListener("click", handleModeClick);
}
//saveBtn이 존재한다면 클릭할 때 이벤트 발생
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}