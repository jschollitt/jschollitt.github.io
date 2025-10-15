// time tracking
let lastTimeStamp = 0;
let tick = 0;

// canvas and context, not const as we don't set the value until document ready
let canvas;
let context;

// game objects
let balls = [];

// run when the website has finished loading
window.addEventListener("load", () => {
    console.log("ready");
    init();
});

// initialise canvas and game elements
function init() {
    console.log("init");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    // create balls above the canvas and distributed evenly across the width
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [0, 255, 0]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [255, 0, 0]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [0, 0, 255]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [255, 255, 0]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [255, 128, 0]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [255, 255, 255]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [0, 0, 0]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [128, 0, 255]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [255, 0, 255]));
    balls.push(new Ball(width + 100, Math.random() * (height - 20) + 15, 20, [128, 128, 128]));
    console.log("balls loaded", balls);

    canvas.addEventListener("click", doClick);
    canvas.onclick = doClick;
    window.requestAnimationFrame(run);
}

// Game loop function
function run(timeStamp) {
    tick = (timeStamp - lastTimeStamp);
    lastTimeStamp = timeStamp;

    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    console.log("ball 0: " + balls[0].position.x + ", " + balls[0].position.y);
    balls.forEach((ball) => {
        ball.update(tick);
    });
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ball.draw(context);
    });
}

function doClick(event) {
    balls.forEach(ball => {
        // don't do anything if the ball is not ready
        if (ball.state !== "launch") {
            return;
        }
        // launch the ball
        ball.launch(-100, Math.random() * 5000);
    });
}

/**
 * 
 * @param {Number} X position 
 * @param {Number} Y position
 * @param {Number} radius size 
 * @param {Number[]} colour 3 channels (0-255)
 * @returns 
 */
function Ball(X, Y, radius, colour) {
    return {
        position: { x: X, y: Y },
        radius: radius,
        r: colour[0],
        g: colour[1],
        b: colour[2],
        a: 1,

        // beginning and end of travel
        origin: { x: X, y: Y },
        target: { x: -500 },

        // time of each phase in ms. Must be above 0
        floatTime: 7000,
        respawnTime: 5000,

        // keep track of progress during each moving phase
        floatTimeDelta: 0,
        respawnTimeDelta: 1,

        state: "launch",

        update: function (tick) {
            switch (this.state) {
                case "drift":
                    // check if target has been reached
                    if (this.position.x == this.target.x) {
                        this.state = "respawn";
                        this.floatTimeDelta = 0;
                        break;
                    }
                    // get progress on timeline as value between 0 and 1
                    let floatTimePercent = this.floatTimeDelta / this.floatTime;
                    // modify % using an easing function
                    let easedFloatDelta = easeOut(floatTimePercent)
                    // update progress with update tick, clamp to valid number range
                    this.floatTimeDelta = clamp(this.floatTimeDelta + tick, 0, this.floatTime);
                    // update position using linear interpolation and eased progress value
                    this.position = lerpVector(this.origin, this.target, easedFloatDelta);
                    break;

                case "respawn":
                    // check if time to stay has elapsed
                    if (this.respawnTimeDelta >= this.respawnTime) {
                        // reset ball to original position
                        this.position.x = this.origin.x;
                        this.state = "drift";
                        this.respawnTimeDelta = Math.random() * this.respawnTimeDelta;
                        break;
                    }

                    // update progress with update tick, clamp to valid number range
                    this.respawnTimeDelta = clamp(this.respawnTimeDelta + tick, 0, this.respawnTime);
                    break;
            }
        },
        draw: function (context) {
            context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a}`;
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        },
        launch: function (destinationX, delay) {
            this.respawnTimeDelta = this.respawnTime - delay;
            this.target = { x: destinationX, y: this.position.y };
            this.state = "respawn";
        },
    }
}

function lerp(origin, destination, time) {
    return origin + (destination - origin) * time;
}

function lerpVector(origin, destination, time) {
    let pos = {
        x: lerp(origin.x, destination.x, time),
        y: lerp(origin.y, destination.y, time)
    };
    return pos;
}

// Easing functions. See here: https://easings.net/
function easeOut(time) {
    return 1 - Math.pow(1 - time, 3);
}

function easeIn(time) {
    return Math.pow(time, 3);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}