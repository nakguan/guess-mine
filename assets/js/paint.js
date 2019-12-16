import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const fill = document.getElementById("jsMode");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const strokePath = (x, y) => {
  ctx.lineTo(x, y);
  ctx.stroke();
};

const onMousemove = e => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, { x, y });
  }
};

const startPainting = () => {
  painting = true;
};

const stopPainting = () => {
  painting = false;
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

const handleCM = e => {
  e.preventDefault();
};

const handleColorClick = e => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleFillCilck = () => {
  if (filling === true) {
    filling = false;
    fill.innerText = "Fill";
  } else {
    filling = true;
    fill.innerText = "Paint";
  }
};

if (canvas) {
  canvas.addEventListener("mousemove", onMousemove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);

  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (fill) {
  fill.addEventListener("click", handleFillCilck);
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStorkedPath = ({ x, y }) => strokePath(x, y);
