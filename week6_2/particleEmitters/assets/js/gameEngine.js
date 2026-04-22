window.addEventListener('DOMContentLoaded', () => {

    const inputNumParticles = document.getElementById('inputNumParticles');
    const inputEmitRate = document.getElementById('inputEmitRate');
    const inputParticleRadius = document.getElementById('inputParticleRadius');
    const inputParticleSpeed = document.getElementById('inputParticleSpeed');
    const inputParticleLifeTime = document.getElementById('inputParticleLifeTime');
    const inputColorStart = document.getElementById('inputColorStart');
    const inputColorEnd = document.getElementById('inputColorEnd');

    // Get references to the span elements for displaying values
    const numParticlesValue = document.getElementById('numParticlesValue');
    const emitRateValue = document.getElementById('emitRateValue');
    const particleRadiusValue = document.getElementById('particleRadiusValue');
    const particleSpeedValue = document.getElementById('particleSpeedValue');
    const particleLifeTimeValue = document.getElementById('particleLifeTimeValue');

    // Add event listeners to update the displayed values when the sliders change
    inputNumParticles.addEventListener('input', () => {
        numParticlesValue.textContent = inputNumParticles.value;
    });
    inputEmitRate.addEventListener('input', () => {
        emitRateValue.textContent = inputEmitRate.value;
    });
    inputParticleRadius.addEventListener('input', () => {
        particleRadiusValue.textContent = inputParticleRadius.value;
    });
    inputParticleSpeed.addEventListener('input', () => {
        particleSpeedValue.textContent = inputParticleSpeed.value;
    });
    inputParticleLifeTime.addEventListener('input', () => {
        particleLifeTimeValue.textContent = inputParticleLifeTime.value;
    });

    gameEngine();
});

function gameEngine() {
    let canvas = document.getElementById("canvas1");
    let context = canvas.getContext('2d');

    let secondsPassed = 0;
    let oldTimeStamp = 0;
    let fps = 0;

    let squaresize = 100;
    let emitters = new Array();

    canvas.addEventListener("mousedown", function (e) { doMouseDown(e) }, false);
    canvas.addEventListener("keydown", function (e) { doKeyDown(e) }, false);

    window.requestAnimationFrame(gameLoop);

    function gameLoop(timeStamp) {

        // Calculate the number of seconds passed since the last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        // Calculate fps
        fps = Math.round(1 / secondsPassed);
        update(secondsPassed);
        // Perform the drawing operation
        draw();

        // The loop function has reached it's end. Request a new frame
        window.requestAnimationFrame(gameLoop);
    }

    function update(secondsPassed) {
        for (var i = 0; i < emitters.length; i++) {
            (emitters[i]).update(secondsPassed);
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        for (var i = 0; i < emitters.length; i++) {
            (emitters[i]).draw();
        }

        // Draw FPS counter to the screen
        context.fillStyle = 'black';
        context.fillRect(0, 0, 120, 50);
        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText("FPS: " + fps, 10, 30);
        /////////////////////////////////
    }

    function doMouseDown(event) {
        console.log(this);
        switch (event.button) {
            case 0:
                addParticleEmitter(getX(event), getY(event));
                console.log(emitters);
                break;

            default:
                break;
        }
    }

    function doKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                // call method for up action
                break;
            case "ArrowDown":
                // call method for down action
                break;
            default:
                // default action, fallback
                break;
        }
    }

    function addParticleEmitter(x, y) {
        const emitter = new Emitter(
            context,
            x,                                          // position X
            y,                                          // position Y
            parseFloat(inputEmitRate.value),            // emit rate
            parseFloat(inputNumParticles.value),        // particle count
            parseFloat(inputParticleRadius.value),      // particle radius
            parseFloat(inputParticleSpeed.value),       // particle speed
            parseFloat(inputParticleLifeTime.value),    // particle life time
            colourValuesFromColorPicker(inputColorStart), // color start
            colourValuesFromColorPicker(inputColorEnd)  // color end
        );
        emitters.push(emitter);
    }

    function colourValuesFromColorPicker(picker) {
        const hexColor = picker.value;
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        return { r, g, b };
    }

    function getX(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientX - rect.left;
    }

    function getY(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientY - rect.top;
    }

    function getRandomInRange(min, max) {
        return Math.random() * (Math.abs(min) + max) + min;
    }
}