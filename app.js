const canvas = document.querySelector("canvas");
const linewidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
// 캔버스에 그림을 그릴때 사용하는 것. canvas는 html의 한 element
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = linewidth.value;

let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  } else {
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  }
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

// 이거 한번에 다 바꾸도록 만들어보기
function onColorChange(event) {
  ctx.strokeStyle = ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = ctx.fillStyle = color.value = colorValue;

  // 선택한 색깔 알려주기 위해
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);

// document.addEventListener("mouseup", onMouseUp);

canvas.addEventListener("mouseleave", cancelPainting);

linewidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
