const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

const aside = document.querySelector("aside");

let isPainting = false;
let brushSize = 25;
let startX;
let startY;
ctx.strokeStyle = "#FFCEE4";

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

// when you click a paint:
// ⑴ Change the overall colour value of the stroke
// ⑵ Update the cursor paint brush
// ⑶ Add the .selected class tot he chosen paint colour
// ⑷ Remove the .selected class from the other paint colours

const paintColours = document.querySelectorAll(".colours img");

paintColours.forEach(function (paintColour) {
	paintColour.addEventListener("click", () => {
		ctx.strokeStyle = paintColour.dataset.hexcode;

        canvas.style.cursor = "url(../assets/pb-" + paintColour.id + ".ico), auto";
        document.querySelector('.colour-palette').style.cursor = "url(../assets/pb-" + paintColour.id + ".ico), auto";
        document.querySelector('.colours').style.cursor = "url(../assets/pb-" + paintColour.id + ".ico), auto";
        document.querySelectorAll('.colours img').forEach(function (x) {
            x.style.cursor = "url(../assets/pb-" + paintColour.id + ".ico), auto";
        });


		// Remove the .selected class from all items
		paintColours.forEach((otherColour) => {
			otherColour.classList.remove("selected");
		});

		paintColour.classList.add("selected");
	});
});

document.querySelector('#erase').addEventListener('click', () => {
    ctx.strokeStyle = 'white';

        canvas.style.cursor = "url(../assets/pb-clear.ico), auto";
        document.querySelector('.colour-palette').style.cursor = "url(../assets/pb-clear.ico), auto";
        document.querySelector('.colours').style.cursor = "url(../assets/pb-clear.ico), auto";
        document.querySelectorAll('.colours img').forEach(function (x) {
            x.style.cursor = "url(../assets/pb-clear.ico";
        });
})


//  ---- DOWNLOAD IMAGE ----
const dlBtn = document.querySelector("#download");

dlBtn.addEventListener("click", function () {

    html2canvas(canvas).then((canvas) => {
        const imageDataURL = canvas.toDataURL("image/png");

        // Create a download link for the image
        const a = document.createElement("a");
        a.href = imageDataURL;
        a.download = "dog.png";
        a.click();

    });

});