import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const controls = document.getElementById("jsControls");
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

const strokePath = (x, y, color = null) => {
  let currentColor = ctx.strokeStyle;
  if (color != null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.strokeStyle = currentColor;
};

const onMousemove = e => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle
    });
  }
};

const startPainting = () => {
  painting = true;
};

const stopPainting = () => {
  painting = false;
};

const fillCanvas = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentColor;
};

const handleCanvasClick = () => {
  if (filling) {
    fillCanvas();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
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

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (fill) {
  fill.addEventListener("click", handleFillCilck);
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStorkedPath = ({ x, y, color }) => strokePath(x, y, color);
export const handleFilled = ({ color }) => {
  console.log(color);
  let currentFill = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentFill;
};

export const disableCanvas = () => {
  canvas.removeEventListener("mousemove", onMousemove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);

  canvas.removeEventListener("click", handleCanvasClick);
  canvas.removeEventListener("contextmenu", handleCM);
};

export const enableCanvas = () => {
  canvas.addEventListener("mousemove", onMousemove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);

  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
};

export const hideControls = () => {
  controls.style.display = "none";
};

export const showControls = () => {
  controls.style.display = "flex";
};

export const resetCanvas = () => fillCanvas("#fff");

if (canvas) {
  enableCanvas();
}
