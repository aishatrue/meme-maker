const saveBtn = document.getElementById("save");
const canvas = document.querySelector("canvas");
const linewidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");

const modeOptions = document.getElementById("mode-button");
const destroyOptions = document.getElementById("destroy-button");
const eraserOptions = document.getElementById("eraser-button");
// 캔버스에 그림을 그릴때 사용하는 것. canvas는 html의 한 element
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.linecap = "round";
ctx.lineWidth = linewidth.value;

let isPainting = false;
let isFilling = false;
let isDestroying = false;

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

function onModeChange(event) {
  if (isFilling) {
    isFilling = false;
    modeOptions.innerText = "🩸 Fill";
  } else {
    isFilling = true;
    modeOptions.innerText = "🩸 Draw";
  }
}

function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick(event) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(event) {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeOptions.innerText = "🩸 Fill";
}

function onFileChange(event) {
  console.dir(event.target);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.linewidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick(event) {
  const url = canvas.toDataURL();
  // 가짜 링크임.
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);

canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);
linewidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeOptions.addEventListener("click", onModeChange);
destroyOptions.addEventListener("click", onDestroyClick);
eraserOptions.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
