window.onload = () => {
    const canvas10 = document.getElementById('canvas10');
    const context10 = canvas10.getContext("2d");
    bouncingBall(canvas10, context10);
}

function bouncingBall(canvas, context) {
    let raf;

    const ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 25,
        color: "blue",
        draw() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        },
    };

    function clear() {
        context.fillStyle = "rgb(255 255 255 / 30%)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        clear();
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (
            ball.y + ball.vy > canvas.height - ball.radius ||
            ball.y + ball.vy < ball.radius
        ) {
            ball.vy = -ball.vy;
        }
        if (
            ball.x + ball.vx > canvas.width - ball.radius ||
            ball.x + ball.vx < ball.radius
        ) {
            ball.vx = -ball.vx;
        }

        raf = window.requestAnimationFrame(draw);
    }

    draw();

}