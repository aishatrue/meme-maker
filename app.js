const canvas = document.querySelector("canvas");
const button = document.querySelector(".color-button");

// 캔버스에 그림을 그릴때 사용하는 것. canvas는 html의 한 element
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;
const colors = ["red", "#e67e22", "#1abc9c", "#f1c40f"];

function onClick(event) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  ctx.arc(event.offsetX, event.offsetY, 3, 0, 2 * Math.PI);
  ctx.fill();
}

canvas.addEventListener("mousemove", onClick);
