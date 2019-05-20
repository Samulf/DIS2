
//#region Variables and constants
// constants  
const
	COLS = 26,
	ROWS = 26,
	ENEMYCOUNT = 1,
	// cell types
	EMPTY = 0,
	SNAKE = 1,
	FOOD = 2,
	ENEMY = 3,
	// direction
	LEFT = 0,
	UP = 1,
	RIGHT = 2,
	DOWN = 3,
	//keypress codes
	KEY_LEFT = 37,
	KEY_UP = 38,
	KEY_RIGHT = 39,
	KEY_DOWN = 40,
	//Speeds
	DEV = 20,
	SLOW = 10,
	NORMAL = 5,
	FAST = 2;

// variables
var PLAY = true,
	windowSizeIsWide = true,
	speed = NORMAL,
	canvas,
	ctx,
	keystate,
	frames,
	score,
	topTenHighScores = [];

//#endregion

var grid = {
	width: null,
	height: null,
	_grid: null,

	init: function (d, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];

		for (var x = 0; x < this.width; x++) {
			this._grid.push([]);
			for (var y = 0; y < this.height; y++) {
				this._grid[x].push(d);
			}
		}

	},

	set: function (val, x, y) {
		this._grid[x][y] = val;
	},

	get: function (x, y) {
		return this._grid[x][y];
	}
}

var snake = {
	direction: null,
	head: null,
	_queue: null,

	insert: function (x, y) {
		this._queue.unshift({ x: x, y: y });
		this.head = this._queue[0];
	},

	remove: function () {
		return this._queue.pop();
	},

	init: function (d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
	},
}

function setFood() {
	// get a array of empty cells (no food or snake)
	var emptyCells = getCellArrayForType(EMPTY);
	// take random empty cell
	var randomCell = emptyCells[Math.floor(Math.random() * (emptyCells.length - 1))];
	// set that cell in the grid to be FOOD
	grid.set(FOOD, randomCell.x, randomCell.y);
}
function setEnemy() {
	// get a array of empty cells (no food or snake)
	var emptyCells = getCellArrayForType(EMPTY);
	// take random empty cell
	var randomCell = emptyCells[Math.floor(Math.random() * (emptyCells.length - 1))];
	// set that cell in the grid to be FOOD
	grid.set(ENEMY, randomCell.x, randomCell.y);
}

function getCellArrayForType(cellType) {
	var cellArray = [];
	for (x = 0; x < grid.width; x++) {
		for (y = 0; y < grid.height; y++) {
			if (grid.get(x, y) === cellType) {
				cellArray.push({ x: x, y: y });
			}
		}
	}
	return cellArray;
}

async function init() {
	await getHighscores(printHighscore)
	$('#status').text(PLAY);
	grid.init(EMPTY, COLS, ROWS);
	score = 0;

	var startPosition = { x: Math.floor(COLS / 2), y: ROWS - 1 };
	snake.init(UP, startPosition.x, startPosition.y);
	grid.set(SNAKE, startPosition.x, startPosition.y);

	setFood();
	setEnemy();
}

function loop() {
	if (PLAY) {
		update();
	}
	if (PLAY) {
		draw();
	}
	window.requestAnimationFrame(loop, canvas)
}

function update() {
	frames++;

	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}

	if (frames % speed === 0) {
		var newX = snake.head.x;
		var newY = snake.head.y;

		switch (snake.direction) {
			case LEFT:
				newX--;
				break;
			case UP:
				newY--;
				break;
			case RIGHT:
				newX++;
				break;
			case DOWN:
				newY++;
				break;
		}

		// Om snake går utanför kanten. ( X )
		if (newX < 0 || newX > grid.width - 1) {
			newX = calcNewPositionX(newX);
		}
		// Om snake går utanför kanten. ( Y )
		if (newY < 0 || newY > grid.height - 1) {
			newY = calcNewPositionY(newY);
		}

		// Kollar om snake krockar med sig själv.
		if (grid.get(newX, newY) === SNAKE) {
			restart();
		}
		// Kollar om snake krockar med en Enemy.
		if (grid.get(newX, newY) === ENEMY) {
			restart();
		}
		else {

			var newEnemyPos = setNewEnemyPosition(snake.head.x, snake.head.y);

			// om enemy kommer ta en del av Snake.
			if (grid.get(newEnemyPos.x, newEnemyPos.y) === SNAKE) {
				restart()
			}
			else {
				// Om snake tar mat 
				if (grid.get(newX, newY) === FOOD) {
					score++;
					setFood();
				} else {
					var tail = snake.remove();
					grid.set(EMPTY, tail.x, tail.y);
				}

				// om Enemy håller på att gå in i maten så står den still istället.
				if (grid.get(newEnemyPos.x, newEnemyPos.y) !== FOOD) {
					var oldEnemyPos = getCellArrayForType(ENEMY)[0];
					grid.set(EMPTY, oldEnemyPos.x, oldEnemyPos.y);
					grid.set(ENEMY, newEnemyPos.x, newEnemyPos.y);
				}
				grid.set(SNAKE, newX, newY);
				snake.insert(newX, newY);
			}
		}
	}
}

function calcNewPositionX(x) {
	if (x > COLS - 1) {
		x = 0;
	}
	else if (x === -1) {
		x = COLS - 1;
	}
	return x;
}
function calcNewPositionY(y) {
	if (y > ROWS - 1) {
		y = 0;
	}
	else if (y === -1) {
		y = ROWS - 1;
	}
	return y;
}

function setNewEnemyPosition(sx, sy) {
	var enemyPos = getCellArrayForType(ENEMY)[0];
	var ex = enemyPos.x;
	var ey = enemyPos.y;
	var newEnemyX = ex;
	var newEnemyY = ey;

	//om Enemy är i samma kolumn som Snake behöver Enemy en ny Y-koordinat som är närmare Snakes Y
	if (ex === sx) {
		sy < ey ? newEnemyY-- : newEnemyY++;
	}
	//om Enemy är på samma rad som Snake behöver Enemy en ny X-koordinat som är närmare Snakes X
	else if (ey === sy) {
		sx < ex ? newEnemyX-- : newEnemyX++;
	}
	else {
		var snakeIsGoingVertical = (snake.direction === UP || snake.direction === DOWN)

		if (snakeIsGoingVertical) {
			sy < ey ? newEnemyY-- : newEnemyY++;
		}
		else {
			sx < ex ? newEnemyX-- : newEnemyX++;
		}
	}
	//om Enemy håller på att ställa sig på FOOD så står den still ett steg.
	if (grid.get(newEnemyX, newEnemyY === FOOD) || isBadX(newEnemyX) || isBadY(newEnemyY)) {
		newEnemyX = ex;
		newEnemyY = ey;
	}
	return { x: newEnemyX, y: newEnemyY };
}

function isBadX(x) {
	return (x < 0 || x > COLS - 1)
}

function isBadY(y) {
	return (y < 0 || y > ROWS - 1)
}

function draw() {
	var tw = canvas.width / grid.width;
	var th = canvas.height / grid.height;

	for (var x = 0; x < grid.width; x++) {
		for (var y = 0; y < grid.height; y++) {
			var cell = grid.get(x, y);

			// drawBorder(x * tw, y * th, tw, th);
			switch (cell) {
				case EMPTY:
					ctx.fillStyle = "#000";
					break;

				case SNAKE:
					ctx.fillStyle = "#59FF52";
					break;

				case FOOD:
					ctx.fillStyle = "#f00";
					break;

				case ENEMY:
					ctx.fillStyle = "#FFF452";
					break;
			}
			ctx.fillRect(x * tw, y * th, tw, th);

			ctx.fillStyle = "#fff";
			ctx.fillText("SCORE: " + score, 10, canvas.height - 10);

		}
	}
}

function drawBorder(xPos, yPos, width, height, thickness = 1) {
	ctx.fillStyle = "#FF856B";
	ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}

function main() {
	createCanvas();
	checkSize();
	frames = 0;
	keystate = {};

	document.addEventListener("keydown", function (evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function (evt) {
		delete keystate[evt.keyCode];
	});
	$(window).keypress(function (e) {
		if (e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault()
			play();
		}
	})

	// getHighscores(printHighscore);
	init();
	loop();

}

const GRÄNSEN = 1375; 

function checkSize() {
	console.log("checkSize!");
	const w = window.innerWidth;
	if (w <= GRÄNSEN && windowSizeIsWide) {
		console.log("den blev liten!");
		console.log(w);
		windowSizeIsWide = false;
		$("#canvasContainer").addClass("canvasContainer-small");
		$("#canvasContainer").removeClass("canvasContainer-normal");
		$("#canvasContainer").css("height", w);
		$("#canvasContainer").css("width", w);

	} else if (w > GRÄNSEN && !windowSizeIsWide) {
		console.log("den blev stor!");
		windowSizeIsWide = true;
		$("#canvasContainer").addClass("canvasContainer-normal");
		$("#canvasContainer").removeClass("canvasContainer-small");
	} else if (windowSizeIsWide) {
		$("#canvasContainer").css("height", 500);
		$("#canvasContainer").css("width", 500);
	}
}

function createCanvas() {
	canvas = document.getElementById("snukCanvas");
	canvas.width = COLS * 20;
	canvas.height = ROWS * 20;
	ctx = canvas.getContext("2d");
	ctx.font = "15px Helvetica";
}

async function getHighscores(printHighscore) {

	const url = 'https://snök.azurewebsites.net/api/gethighscores';

	fetch(url)
		.then(response => response.json())
		.then(json => printHighscore(json));
}

async function postHighscore(highscore) {

	const url = 'https://snök.azurewebsites.net/api/savehighscore';

	postData(url, highscore)
		.then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
		.then(getHighscores(printHighscore))
		.catch(error => console.error(error));
}

function postData(url = '', data = {}) {
	// Default options are marked with *
	  return fetch(url, {
		 method: 'POST', // *GET, POST, PUT, DELETE, etc.
		 mode: 'cors', // no-cors, cors, *same-origin
		 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		 credentials: 'same-origin', // include, *same-origin, omit
		 headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		 },
		 redirect: 'follow', // manual, *follow, error
		 referrer: 'no-referrer', // no-referrer, *client
		 body: JSON.stringify(data), // body data type must match "Content-Type" header
	  })
	  .then(response => response.json()); // parses JSON response into native Javascript objects 
   }

async function printHighscore(list) {
	if (list !== null && list !== undefined) {
		var ol = document.getElementById("hsList");
		ol.innerHTML = "";
		for (var i=0; i<list.length; i++) {
			var ob = list[i];
			var name = ob.name;
			var score = ob.score;
			var li = document.createElement("li");
			li.innerHTML = name + " - " + score + " points";
			ol.appendChild(li);
			topTenHighScores.push({name: name, score: score});
		}
	}
}

function play() {
	PLAY = !PLAY;
	$('#status').text(PLAY);
}

function restart() {
	if (topTenHighScores.some(highscore => highscore.score < score) || topTenHighScores.length < 10) {
		enterNameForHighscore();
	}
	getHighscores(printHighscore);
	frames = 0;
	PLAY = false;
	return init();
}

async function enterNameForHighscore() {
	const name = prompt("You entered the highscore with " + score + " points! What's your name?").substring(0, 11);
	const highscore = {
		name: name,
		score: score,
		otherinfo: null
	};
	await postHighscore(highscore);

}

function changeSpeed(btn) {
	switch (btn.id) {
		case "slowBtn":
			speed = SLOW;
			break;
		case "normBtn":
			speed = NORMAL;
			break;
		case "fastBtn":
			speed = FAST;
			break;
		case "incrBtn":
			speed = FAST;
			break;
	}
}

main();

$('#btn-left').on('click', () => snake.direction = LEFT);
$('#btn-up').on('click', () => snake.direction = UP);
$('#btn-right').on('click', () => snake.direction = RIGHT);
$('#btn-down').on('click', () => snake.direction = DOWN);