class GameEngine {

    constructor(canvas, window) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.window = window;
        
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.fps = 0;
        
        this.gameObjects = new Array();
        
        this.gameLoop = this.gameLoop.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.doMouseDown = this.doMouseDown.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
        this.checkCollisions = this.checkCollisions.bind(this);
        this.checkWallCollisions = this.checkWallCollisions.bind(this);
        this.checkObjectCollisions = this.checkObjectCollisions.bind(this);
        this.rectIntersect = this.rectIntersect.bind(this);
        var temp = this;
        this.canvas.addEventListener("mousedown", function(e){temp.doMouseDown(e)}, false);
        this.canvas.addEventListener("keydown", function(e){temp.doKeyDown(e)}, false);
        
        this.window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop(timeStamp) {

        // Calculate the number of seconds passed since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Calculate fps
        this.fps = Math.round(1 / this.secondsPassed);
        //console.log(this.secondsPassed.toString());
        this.update(this.secondsPassed);
        // Perform the drawing operation
        this.draw();

        // The loop function has reached it's end. Keep requesting new frames
        this.window.requestAnimationFrame(this.gameLoop);
    }

    update(secondsPassed) {
        this.checkCollisions();
        for (var i = 0; i < this.gameObjects.length; i++) {
            (this.gameObjects[i]).update(secondsPassed);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        
        for (var i = 0; i < this.gameObjects.length; i++) {
            (this.gameObjects[i]).draw(this.context);
        }

        // Draw number to the screen
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 120, 50);
        this.context.font = '25px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText("FPS: " + this.fps, 10, 30);
    }

    doMouseDown(event) {
        console.log(this);
        switch (event.button) {
            case 0:
                var rect = this.canvas.getBoundingClientRect();
                this.gameObjects.push(
                    new Square(
                        null,
                        event.clientX - rect.left, 
                        event.clientY - rect.top,
                        Math.random() * 100 - 5,
                        Math.random() * 100 - 5,
                        100,
                        100
                    )
                )
                break;
        
            default:
                break;
        }
    }

    doKeyDown(event) {
        switch (event.key) {
            case ArrowUp:
                //xStep *= 1.1;
                //yStep *= 1.1;
                break;
            case ArrowDown:
                //xStep *= 0.91;
                //yStep *= 0.91;
                break;
            default:
                //
                break;
        }
    }

    checkCollisions() {
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.checkWallCollisions(this.gameObjects[i]);
            this.checkObjectCollisions(this.gameObjects[i], i);
        }
        
    }

    checkWallCollisions(object) {
        // check right and left wall overlap
        if (object.getRight() >= this.canvas.clientWidth) {
            //console.log("wall");
            object.vx = -object.vx;
            object.x = this.canvas.clientWidth - object.width - 1;
        }
        else if (object.x <= 0) {
            //console.log("wall");
            object.vx = -object.vx;
            object.x = 1;
        }
        
        // check bottom and top wall overlap
        if (object.getBottom() >= this.canvas.clientHeight) {
            object.vy = -object.vy;
            object.y = this.canvas.clientHeight - object.height - 1;;
        }
        else if (object.y <= 0) {
            //console.log("wall");
            object.vy = -object.vy;
            object.y = 1;
        }
        

        
    }

    checkObjectCollisions(object, index) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (object !== this.gameObjects[i])
            {
                var isCol = this.rectIntersect(
                    object.x, 
                    object.y, 
                    object.width,
                    object.height,
                    this.gameObjects[i].x,
                    this.gameObjects[i].y,
                    this.gameObjects[i].width,
                    this.gameObjects[i].height
                    );
                    object.isColliding = isCol;
                    if (isCol) {
                        (this.gameObjects[i]).isColliding = isCol;
                        break;
                    } 
            }
        }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
    }
}