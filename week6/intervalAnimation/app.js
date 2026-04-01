
window.onload = () => {

    const canvas5 = document.getElementById('canvas5');
    const context5 = canvas5.getContext("2d");
    slidingSquare(canvas5, context5);

}

function slidingSquare(canvas, context) {
    let x = -50;
    let y = 0;


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "red";
        context.rect(x, y, 50, 50);
        context.fill();
        x++;

        if (x > canvas.width) {
            x = -50;
        }
    }

    setInterval(draw, 16);
}
