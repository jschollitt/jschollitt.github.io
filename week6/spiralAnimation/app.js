window.onload = () => {
    const canvas7 = document.getElementById('canvas7');
    const context7 = canvas7.getContext("2d");
    drawSpiral(context7);
}

function drawSpiral(context) {
    let x = 0;
    let y = 0;
    let radius = 10;
    let radiusOffset = 0.2;
    let arcStart = 0;
    let arcFinish = 0.05 * Math.PI;
    let arcOffset = 0.05;

    let spiral = setInterval(draw, 20);

    function draw() {
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "magenta";
        context.arc(400, 200, radius, arcStart, arcFinish, false);
        context.stroke();

        radius = radius + radiusOffset;
        arcStart = arcStart + arcOffset;
        arcFinish = arcFinish + arcOffset;

        if (radius > 600) {
            clearInterval(spiral);
        }
    }
}