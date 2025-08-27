window.onload = () => {
    const canvas8 = document.getElementById('canvas8');
    const context8 = canvas8.getContext("2d");
    face(context8);

}

function face(context) {

    let x = 15;
    let y = 15;
    let xAdd = 3;
    let yAdd = 1;

    // Grey background
    context.fillStyle = "rgb(200, 200, 200)";
    context.fillRect(50, 50, 400, 400);

    // Head
    context.beginPath();
    context.arc(250, 250, 100, 0, Math.PI * 2, true);
    context.fillStyle = "rgb(255, 154, 145";
    context.fill();
    context.closePath();
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();

    // Left eye
    context.beginPath();
    context.arc(220, 240, 40, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // Right eye
    context.beginPath();
    context.arc(290, 240, 40, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // Left iris
    context.beginPath();
    context.arc(225, 240, 5, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.stroke();

    // Right iris
    context.beginPath();
    context.arc(285, 240, 5, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.stroke();

    context.beginPath();
    context.arc(250, 310, 20, Math.PI, 0, true);
    context.closePath();
    context.lineWidth = 10;
    context.strokeStyle = "red";
    context.stroke();

    function moveEyes() {
        x += xAdd;
        y += yAdd;
        if (x > 20 || x < 0) xAdd = -xAdd;
        if (y > 20 || x < 0) yAdd = -yAdd;
        x += xAdd;
        y += yAdd;
        doEyes(x, y);
    }

    function doEyes(x, y) {

        // draw 2 black circles
        context.beginPath();
        context.arc(220, 240, 40, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
        context.fillStyle = 'rgb(255,255,255)';
        context.fill();

        context.beginPath();
        context.arc(290, 240, 40, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
        context.fillStyle = 'rgb(255,255,255)';
        context.fill();

        // draw 2 blue circles
        context.beginPath();
        context.arc(225 + x, 240 + y, 5, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.stroke();

        context.beginPath();
        context.arc(285 + x, 240 + y, 5, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.stroke();
    }
    setInterval(moveEyes, 200);
}
