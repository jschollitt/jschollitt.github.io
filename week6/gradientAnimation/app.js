
window.onload = () => {

    const canvas4 = document.getElementById('canvas4');
    const context4 = canvas4.getContext("2d");
    animateGradient(canvas4, context4);

}

function animateGradient(canvas, context) {

    let halfWidth = 0.5 * canvas.width;
    let halfHeight = 0.5 * canvas.height;
    let radii = [
        10,
        halfHeight / 2,
        halfHeight
    ]
    let grow = true;

    let animation = setInterval(animate, 20);

    function animate() {
        update();
        draw();
    }

    function update() {
        if (grow) {
            radii[1]++;
        }
        else {
            radii[1]--;
        }

        if (radii[1] >= radii[2] - 1 || radii[1] <= radii[0] + 1) {
            grow = !grow;
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        let gradient = context.createRadialGradient(
            halfWidth, halfHeight, radii[0],
            halfWidth, halfHeight, radii[1]
        );
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "blue");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}