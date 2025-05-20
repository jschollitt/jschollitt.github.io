// time tracking
let lastTimeStamp = 0;
let tick = 0;

// canvas and context, not const as we don't set the value until document ready
let canvas;
let context;

// game objects
let balls = [];
let index = 0;

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

    // create balls above the canvas and distributed evenly across the width
    balls.push(new Ball(72,  -20, 20, [0,255,0]));
    balls.push(new Ball(144, -20, 20, [255,0,0]));
    balls.push(new Ball(216, -20, 20, [0,0,255]));
    balls.push(new Ball(288, -20, 20, [255,255,0]));
    balls.push(new Ball(360, -20, 20, [255,128,0]));
    balls.push(new Ball(432, -20, 20, [255,255,255]));
    balls.push(new Ball(504, -20, 20, [0,0,0]));
    balls.push(new Ball(576, -20, 20, [128,0,255]));
    balls.push(new Ball(648, -20, 20, [255,0,255]));
    balls.push(new Ball(720, -20, 20, [128,128,128]));
    console.log("balls loaded", balls);

    canvas.addEventListener("click", doClick);
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
    // don't do anything if the ball is not ready
    if (balls[index].state !== "ready") {
        return;
    }

    let bounds = canvas.getBoundingClientRect();

    // use the next ball x postion and the mouse y position
    // so the ball will travel vertically to the height of the mouse click
    inCanvasX = balls[index].position.x;
    inCanvasY = Math.floor(event.clientY - bounds.top);

    // launch the ball
    balls[index].launch(inCanvasX, inCanvasY);

    // set the next ball index to be launched
    index = (index + 1 + balls.length) % balls.length;
}

function Ball(X, Y, radius, colour) {
    return {
        position: { x: X,y: Y },
        radius: radius,
        r: colour[0],
        g: colour[1],
        b: colour[2],
        a: 1,

        // beginning and end of travel
        origin: {x: X, y: Y},
        target: null,
        
        // time of each phase in ms. Must be above 0
        launchTime: 1000,
        stayTime: 5000,
        fadeTime: 5000,
        
        // keep track of progress during each moving phase
        launchTimeDelta: 0,
        stayTimeDelta: 0,
        fadeTimeDelta: 0,
        
        state: "ready",

        update: function (tick) {
            switch(this.state) {
                case "launch":
                    // check if target has been reached
                    if (this.position.x == this.target.x && this.position.y == this.target.y) {
                        this.state = "stay";
                        this.launchTimeDelta = 0;
                        break;
                    }
                    // get progress on timeline as value between 0 and 1
                    let launchTimePercent = this.launchTimeDelta / this.launchTime;
                    // modify % using an easing function
                    let easedLaunchDelta = easeOut(launchTimePercent)

                    // update progress with update tick, clamp to valid number range
                    this.launchTimeDelta = clamp(this.launchTimeDelta + tick, 0, this.launchTime);
                    // update position using linear interpolation and eased progress value
                    this.position = lerpVector(this.origin, this.target, easedLaunchDelta);
                    break;

                case "stay":
                    // check if time to stay has elapsed
                    if (this.stayTimeDelta >= this.stayTime) {
                        this.state = "fade";
                        this.stayTimeDelta = 0;
                        break;
                    }
                    // update progress with update tick, clamp to valid number range
                    this.stayTimeDelta = clamp(this.stayTimeDelta + tick, 0, this.stayTime);
                    break;

                case "fade":
                    // check if time to stay has elapsed
                    if (this.fadeTimeDelta >= this.fadeTime) {
                        // reset ball to original position
                        this.position.y = -20;
                        this.state = "ready";
                        this.fadeTimeDelta = 0;
                        this.a = 1;
                        break;
                    }
                    // get progress on timeline as value between 0 and 1
                    let fadeTimePercent = this.fadeTimeDelta / this.fadeTime;

                    this.a = (1 - fadeTimePercent);

                    // update progress with update tick, clamp to valid number range
                    this.fadeTimeDelta = clamp(this.fadeTimeDelta + tick, 0, this.fadeTime);
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
        launch: function (destinationX, destinationY) {
            this.target = {x: destinationX, y: destinationY};
            this.state = "launch";
        },

    }
}

function lerp(origin, destination, time) {
    return origin + (destination - origin) * time;
}

function lerpVector(origin, destination, time) {
    let position = {
        x: lerp(origin.x, destination.x, time),
        y: lerp(origin.y, destination.y, time)
    };
    return position;
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