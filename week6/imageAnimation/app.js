window.onload = () => {
    const canvas6 = document.getElementById('canvas6');
    const context6 = canvas6.getContext("2d");
    animateImage(canvas6, context6);
}

function animateImage(canvas, context) {
    const img1 = document.getElementById("canvas6Img1");

    let x = 0;
    let y = 0;

    let animation = setInterval(animate, 20);

    function animate() {
        update();
        draw();
    }

    function update() {
        if (x + img1.width > canvas.width) {
            x--;
        }
        else {
            x = 0;
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(img1, x, y);
    }
}
