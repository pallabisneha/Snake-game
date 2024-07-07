let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('eating-sound-effect-36186.mp3');
const gameOverSound = new Audio('game-over-39-199830.mp3');
const runSound = new Audio('running.mp3');
const moveSound = new Audio('direction.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 }
function main(ctime) {



    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //if snake collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {

            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }


}
function gameEngine() {
    if (isCollide(snakeArr)) {

        gameOverSound.play();
        runSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over.Press any to play again !");
        snakeArr = [{ x: 13, y: 15 }];
        runSound.play();
        score = 0;

    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("high score", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score:" + highscoreval;
        }
        scoreBox.innerHTML = "score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
    }
    // moving--
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    const board = document.querySelector('.board');
    board.innerHTML = ""; // Clear the board before drawing the snake

    // Draw the snake
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Draw the food (example position)
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Initialize the game
let highscore = localStorage.getItem("high score");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("high score", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score:" + highscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

