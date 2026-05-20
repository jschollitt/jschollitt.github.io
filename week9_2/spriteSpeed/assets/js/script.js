window.addEventListener('DOMContentLoaded', () => {
	// Character Sprite sheet image from https://opengameart.org/content/base-character-spritesheet-16x16
	const characterSpriteSheet = new Image();
	characterSpriteSheet.src = "./assets/img/blank_character.png";
	characterSpriteSheet.onload = load;

	// set this to the number of elements you want to load before initalising
	const awaitLoadCount = 2;
	let loadCount = 0;

	// time tracking
	let lastTimeStamp = 0;
	let tick = 0;

	// canvas and context, not const as we don't set the value until document ready
	let canvas;
	let ctx;

	// game objects
	let character1;
	let character2;
	let character3;
	let character4;

	// run when the website has finished loading
	window.addEventListener("load", () => {
		console.log("ready");
		load();
	});

	// call this function after each loadable element has finished loading.
	// Once all elements are loaded, loadCount threshold will be met to init.
	function load() {
		loadCount++;
		if (loadCount >= awaitLoadCount) {
			init();
		}
	}

	// initialise canvas and game elements
	function init() {
		console.log("init");
		canvas = document.getElementById('ex2canvas');
		ctx = canvas.getContext('2d');

		character1 = Character(
			characterSpriteSheet,
			[64, 64],
			[[256, 64], [320, 64], [384, 64], [448, 64]],
			[0, 18],
			80
		);

		character2 = Character(
			characterSpriteSheet,
			[64, 64],
			[[256, 64], [320, 64], [384, 64], [448, 64]],
			[0, 100],
			120
		);

		character3 = Character(
			characterSpriteSheet,
			[64, 64],
			[[256, 64], [320, 64], [384, 64], [448, 64]],
			[0, 200],
			160
		);

		character4 = Character(
			characterSpriteSheet,
			[64, 64],
			[[256, 64], [320, 64], [384, 64], [448, 64]],
			[0, 300],
			200
		);

		window.requestAnimationFrame(run);
	}

	// Game loop function
	function run(timeStamp) {
		tick = (timeStamp - lastTimeStamp);
		lastTimeStamp = timeStamp;

		update(tick);
		draw();

		window.requestAnimationFrame(run);
	}

	function update() {
		character1.update(tick);
		character2.update(tick);
		character3.update(tick);
		character4.update(tick);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		character1.draw(ctx);
		character2.draw(ctx);
		character3.draw(ctx);
		character4.draw(ctx);
	}

	function Character(spritesheet, spriteSize, spriteFrames, position, frameTime) {
		return {
			spriteSheet: spritesheet,       // image containing the sprites
			spriteFrameSize: spriteSize,    // dimensions of the sprites in the spritesheet
			spriteFrames: spriteFrames,     // 3d array. X = animation track, Y = animation frame, Z = X & Y of frame

			animationFrame: 0,              // current frame in animation to draw
			frameTime: frameTime,                 // milliseconds to wait between animation frame updates
			timeSinceLastFrame: 0,          // track time since the last frame update was performed

			position: position,               // position of the character (X, Y)
			direction: [0.2, 0],

			update(tick) {
				// increase time keeper by last update delta
				this.timeSinceLastFrame += tick;
				// check if time since last frame meets threshold for new frame
				if (this.timeSinceLastFrame >= this.frameTime) {
					// reset frame time keeper
					this.timeSinceLastFrame = 0;

					this.animationFrame = (this.animationFrame + 1) % this.spriteFrames.length;
				}

				this.position[0] = (this.position[0] + (this.direction[0] * tick)) % canvas.width;
			},

			draw(context) {
				context.drawImage(
					this.spriteSheet,
					this.spriteFrames[this.animationFrame][0],
					this.spriteFrames[this.animationFrame][1],
					this.spriteFrameSize[0],
					this.spriteFrameSize[1],
					this.position[0],
					this.position[1],
					this.spriteFrameSize[0],
					this.spriteFrameSize[1]
				);
			},


		}
	};
});

