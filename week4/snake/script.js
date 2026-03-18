/**
 * Snake game using requestAnimationFrame and displayed in a grid of divs.
 * Capitalised variables are game params and can be adjusted to suit.
 * NOTE: Game is incomplete - missing snake-self collision detection and response.
 */


/**
 * Colours for the different grid cell states
 */
const SNAKECOLOUR = "rgba(14, 216, 14, 1)";
const BLANKCOLOUR = "black";
const FOODCOLOUR = "red";

/**
 * Grid size
 */
const ROWCOUNT = 20;
const COLCOUNT = 20;

/**
 * 2D Array of HTML divs to create the grid
 */
const cells = Array(ROWCOUNT).fill(0).map(x => Array(COLCOUNT).fill(0));
console.log(cells.length, cells[0].length);
var dirChangeThisUpdate = false;

/**
 * Variables for handling game update time (tick) independently from draw time
 */
const TICKRATE = 1000 / 10;
let prevTimestamp = 0;
let frameTime = 0;
let timeSinceUpdate = 0;

/**
 * Snake game object.
 * body: array of snake grid cell locations
 * direction: latest valid direction input from user
 * grow: how many cells to grow by
 * update(): performs growth and snake movement
 */
const snake = {
    body: [[Math.floor(COLCOUNT / 2), 2], [Math.floor(COLCOUNT / 2), 1]],
    direction: "down",
    grow: 0,
    update: function (moveX, moveY) {
        // grow
        if (this.grow > 0) {
            this.body.push([-1, -1]);
            this.grow -= 1;
        }

        // move. Store last head position, move the head, then loop through body cells,
        //       shuffling each cell to the location of the previous cell.
        let lastPos = [...this.body[0]];
        this.body[0][0] = (this.body[0][0] + moveX + COLCOUNT) % COLCOUNT;
        this.body[0][1] = (this.body[0][1] + moveY + ROWCOUNT) % ROWCOUNT;
        for (let i = 1; i < this.body.length; i++) {
            let currentPos = [...this.body[i]];
            this.body[i][0] = lastPos[0];
            this.body[i][1] = lastPos[1];
            lastPos = currentPos;
        }
    }
};

/**
 * Food object.
 * pos: position(x, y) of food location. Starts in front of the snake when game starts.
 * respawn(): get a random x and y value for new food location. If random location 
 *            overlaps with snake head a new value is chosen (while loop)
 */
const food = {
    pos: [snake.body[0][0], snake.body[0][1] + 5],
    respawn: function () {
        let x, y;
        do {
            x = Math.floor(Math.random() * COLCOUNT);
            console.log("food respawn X", x, snake.body[0][0]);
        } while (x == snake.body[0][0]);
        do {
            y = Math.floor(Math.random() * ROWCOUNT);
            console.log("food respawn Y", y, snake.body[0][1]);
        } while (y == snake.body[0][1]);
        this.pos = [x, y];
    }
}

/**
 * On page load completion, initialise the game grid by making a div for each grid square.
 */
window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    console.log(cells);
    for (let i = 0; i < cells.length; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);

        for (let j = 0; j < cells[0].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = 100 / COLCOUNT + "%";
            cell.style.height = 100 / ROWCOUNT + "%";
            row.appendChild(cell);
            cells[i][j] = cell;
        }
    }
    // Begin the game loop
    run();
});

/**
 * On key down event, check if input key is a valid game action and respond.
 */
window.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (dirChangeThisUpdate) return;
    switch (event.key) {
        case "w":
            if (snake.direction != "down") snake.direction = "up";
            dirChangeThisUpdate = true;
            break;
        case "a":
            if (snake.direction != "right") snake.direction = "left";
            dirChangeThisUpdate = true;
            break;
        case "s":
            if (snake.direction != "up") snake.direction = "down";
            dirChangeThisUpdate = true;
            break;
        case "d":
            if (snake.direction != "left") snake.direction = "right";
            dirChangeThisUpdate = true;
            break;
        case " ":
            snake.grow += 1;
            console.log("space");
            break;
        default:
            break;
    }
});

/**
 * Game loop. Performs game operations then calls itself with requestAnimationFrame callback.
 * Timestamp provided by callback used to calc time since last run.
 * @param {number} timestamp 
 */
function run(timestamp) {
    let delta = tick(timestamp);
    update(delta);
    draw();
    window.requestAnimationFrame(run);
}

/**
 * Take time of current frame and update counter of time since last frame.
 * @param {number} timestamp time at requestAnimationFrame callback
 * @returns {number} delta time between last frame and current
 */
function tick(timestamp) {
    frameTime = timestamp - prevTimestamp;
    prevTimestamp = timestamp
    timeSinceUpdate += frameTime;
    return timeSinceUpdate;
}

/**
 * Perform game updates
 * @param {number} timestamp
 */
function update(delta) {
    // check if enough time has passed to meet tick rate.
    if (delta < TICKRATE) return;
    timeSinceUpdate = 0;

    // get X,Y offset movement based on direction of movement
    dirChangeThisUpdate = false;
    let offsetX, offsetY;

    switch (snake.direction) {
        case "up":
            offsetX = 0;
            offsetY = -1;
            break;
        case "down":
            offsetX = 0;
            offsetY = 1;
            break;
        case "left":
            offsetX = -1;
            offsetY = 0;
            break;
        case "right":
            offsetX = 1;
            offsetY = 0;
            break;
        default:
            break;
    }

    // Eat food if snake head overlaps
    if (snake.body[0][0] === food.pos[0] && snake.body[0][1] === food.pos[1]) {
        snake.grow++;
        food.respawn();
    }

    snake.update(offsetX, offsetY);
}

/**
 * Colour the grid of div squares each 'frame'
 */
function draw() {
    cells.forEach(row => row.forEach(cell => cell.style.backgroundColor = BLANKCOLOUR));
    for (let i = 0; i < snake.body.length; i++) {
        cells[snake.body[i][1]][snake.body[i][0]].style.backgroundColor = SNAKECOLOUR;
    }
    cells[food.pos[1]][food.pos[0]].style.backgroundColor = FOODCOLOUR;
}

