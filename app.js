const canvas = document.querySelector("canvas");
const linewidth = document.getElementById("line-width");
const default_button = document.querySelector(".default");
const first_button = document.querySelector(".first");
const second_button = document.querySelector(".second");
const third_button = document.querySelector(".third");
const fourth_button = document.querySelector(".fourth");
const eraser = document.querySelector(".eraser");
// 캔버스에 그림을 그릴때 사용하는 것. canvas는 html의 한 element
const ctx = canvas.getContext("2d");

colors = ["#fc5c65", "#fd9644", "#fed330", "#26de81"];

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = linewidth.value;

let isPainting = false;
let currentColor = "black";

function onMove(event) {
  if (isPainting) {
    ctx.strokeStyle = currentColor;
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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);

// document.addEventListener("mouseup", onMouseUp);

canvas.addEventListener("mouseleave", cancelPainting);

function choseColor(event) {
  let currentClass = event.target.className;

  if (currentClass == "first") {
    currentColor = colors[0];
  } else if (currentClass == "second") {
    currentColor = colors[1];
  } else if (currentClass == "third") {
    currentColor = colors[2];
  } else if (currentClass == "fourth") {
    currentColor = colors[3];
  } else if (currentClass == "default") {
    currentColor = "black";
  } else {
    currentColor = "white";
  }

  ctx.beginPath();
}

first_button.addEventListener("click", choseColor);
second_button.addEventListener("click", choseColor);
third_button.addEventListener("click", choseColor);
fourth_button.addEventListener("click", choseColor);
default_button.addEventListener("click", choseColor);
eraser.addEventListener("click", choseColor);

linewidth.addEventListener("change", onLineWidthChange);
