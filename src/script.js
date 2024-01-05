const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

const aside = document.querySelector("aside");


let isPainting = false;
let brushSize = 25;
let startX;
let startY;
ctx.strokeStyle = 'red';

aside.addEventListener("click", (e) => {
	if (e.target.id === "delete") {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
});

aside.addEventListener("change", (e) => {
	if (e.target.id === "brushSizeSlider") {
		brushSize = e.target.value;
	}
});

// When you change the slider, update the brush size number.
setInterval(function () {
	document.querySelector("#currentSize").textContent = document.querySelector("#brushSizeSlider").value;
	brushSize = document.querySelector("#brushSizeSlider").value;
}, 100);

const draw = (e) => {
    if (!isPainting) {
        return;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    // Adjust the coordinates to be relative to the canvas
    const x = e.clientX - canvasOffsetX;
    const y = e.clientY - canvasOffsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
	isPainting = true;
	startX = e.clientX;
	startY = e.clientY;

	console.log(isPainting);
});

canvas.addEventListener("mouseup", (e) => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

// When you change the slider, update the brush size number.
setInterval(function () {
	document.querySelector("#currentSize").textContent = document.querySelector("#brushSizeSlider").value;
}, 100);


// when you click a paint: (A)