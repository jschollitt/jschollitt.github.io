window.addEventListener('DOMContentLoaded', () => {
	drawOnKeyEvent();
	drawOnToggle();
});

function drawOnKeyEvent() {
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDown);
    let rectX = 0;
    let rectY = 0;
    let offset = 2;

    draw();

    function keyDown(event) {
        switch (event.key) {
            case "w": // up
                rectY -= offset;
                break;
                
            case "a": // left
                rectX -= offset;
                break;

            case "s": // down
                rectY += offset;
                break;

            case "d": // right
                rectX += offset;
                break;
            default:
                break;
        }

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 50, 50);
        ctx.fill();
    }
} 

function drawOnToggle() {
    let canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDown, true);
    document.addEventListener("keyup", keyUp, true);
    let rectX = 0;
    let rectY = 0;
    let offset = 2;

    let keyPressed = "none";
    draw();
    run();

    function keyDown(event) {
        keyPressed = event.key;
    }

    function keyUp(event) {
        keyPressed = "none";
    }

    function run() {
        update();
        draw();
        requestAnimationFrame(run);
    }

    function update() {
        switch (keyPressed) {
            case "a": //left
                rectX -= offset;
                break;
            case "w": //up
                rectY -= offset;
                break;
            case "d": //right
                rectX += offset;
                break;
            case "s": //down
                rectY += offset;
                break;
            default:
                break;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 50, 50);
        ctx.fill();
    }
} 