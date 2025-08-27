window.onload = () => {

    const canvas1 = document.getElementById('canvas1');
    const context1 = canvas1.getContext("2d");
    drawShapes(context1, false);

    const canvas2 = document.getElementById('canvas2');
    const context2 = canvas2.getContext("2d");
    drawShapes(context2, true);

}

function drawShapes(context, drawFilled) {
    // Draw a line
    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(390, 10);
    context.lineWidth = 3;
    context.stroke();

    // Draw a square
    context.strokeStyle = context.fillStyle = "red";
    context.beginPath();
    context.rect(10, 20, 50, 100);
    drawFilled ? context.fill() : context.stroke();

    // Draw a triangle
    context.strokeStyle = context.fillStyle = "green";
    context.beginPath();
    context.moveTo(100, 20);
    context.lineTo(250, 20);
    context.lineTo(175, 100);
    context.lineTo(100, 20);
    drawFilled ? context.fill() : context.stroke();

    // Draw a circle
    context.strokeStyle = context.fillStyle = "blue";
    context.beginPath();
    context.arc(300, 100, 50, 0, 2 * Math.PI, true);
    context.closePath();
    drawFilled ? context.fill() : context.stroke();

    // Draw Pacman
    context.strokeStyle = context.fillStyle = "yellow";
    context.beginPath();
    context.arc(350, 225, 50, -1, 1, true);
    context.lineTo(350, 225);
    context.closePath();
    drawFilled ? context.fill() : context.stroke();

    // Draw a checkmark
    context.strokeStyle = context.fillStyle = "orange";
    context.beginPath();
    context.moveTo(20, 200);
    context.quadraticCurveTo(0, 300, 200, 200);
    context.quadraticCurveTo(-50, 360, 20, 200);
    drawFilled ? context.fill() : context.stroke();
}