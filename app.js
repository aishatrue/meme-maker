const canvas = document.querySelector("canvas");

// 캔버스에 그림을 그릴때 사용하는 것. canvas는 html의 한 element
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210 - 40, 200, 15, 100);
ctx.fillRect(350 - 40, 200, 15, 100);
ctx.fillRect(260 - 40, 200, 60, 200);

ctx.arc(250, 100 + 30, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260 + 10, 80 + 30, 8, 1 * Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80 + 30, 8, 1 * Math.PI, 2 * Math.PI);
ctx.fill();
