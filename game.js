var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');

var mainMenu = true;
var score = 0;
var scoreCanvas = document.getElementById('score');
var scoreContext = scoreCanvas.getContext('2d');

var cells = [];
const COLORS = ['blue', 'red', 'yellow', 'green', 'magenta', 'orange'];
const CELL_SIZE = 20; // size in pixels

const HORZ_CELLS = Math.floor(canvas.width/CELL_SIZE);
const VERT_CELLS = Math.floor(canvas.height/CELL_SIZE);

window.onload = () => {

    createButtons();
    drawMainMenu();

    canvas.addEventListener('click', function(e) {
        if (mainMenu) {
            mainMenu = false;
            updateScore(0);
            generateMap();
        }
    });
}

function generateMap() {

    cells = [];

    for (let h = 0; h < VERT_CELLS; h++) {

        var line = [];

        for (let w = 0; w < HORZ_CELLS; w++) {

            line.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
        }

        cells.push(line);
    }

    cells[0][0] = 'grey';

    drawBoard();
}

function isGameOver() {

    for (let y = 0; y < VERT_CELLS; y++) {
        for (let x = 0; x < HORZ_CELLS; x++) {
            if (cells[y][x] !== 'grey') return false;
        }
    }

    return true;
}

function drawMainMenu() {
    const fontSize = 50;
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.font = fontSize + "px arial"
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("C", fontSize, fontSize + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("O", fontSize * 2, fontSize * 2 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("L", fontSize * 3, fontSize * 3 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("O", fontSize * 4, fontSize * 4 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("R", fontSize * 5, fontSize * 5 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("W", fontSize * 6, fontSize * 3 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("A", fontSize * 7, fontSize * 4 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("L", fontSize * 8, fontSize * 5 + 20);
    canvasContext.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    canvasContext.fillText("K", fontSize * 9, fontSize * 6 + 20);

    canvasContext.fillStyle = 'white';
    canvasContext.font = "20px arial"
    if (!score) {
        canvasContext.fillText("CLICK TO PLAY", canvas.width/2 - 75, canvas.height - 50);
    } else {
        canvasContext.fillText("CLICK TO PLAY AGAIN", canvas.width/2 - 95, canvas.height - 50);
    }
}

function drawBoard() {

    // Draw every square with the updated color
    for (let h = 0; h < VERT_CELLS; h++) {
        for (let w = 0; w < HORZ_CELLS; w++) {
            colorRect(w * CELL_SIZE, h * CELL_SIZE, CELL_SIZE, CELL_SIZE, cells[h][w]);
        }
    }
}

function pickColor(button) {

    if (mainMenu) return;

    let color = button.id;

    for (let y = 0; y < VERT_CELLS; y++) {
        for (let x = 0; x < HORZ_CELLS; x++) {
            checkRow(color, y);
            checkColumn(color, x);
        }
    }

    updateScore();
    mainMenu = isGameOver();
    if (!mainMenu) {
        drawBoard();
    } else {
        drawMainMenu();
    }
}

function checkRow(color, y, previousColor, x) {

    x = x || 0;

    if (x >= HORZ_CELLS) return;

    if (cells[y][x] === color && previousColor === 'grey') {
        cells[y][x] = 'grey';
    }

    var nextColor = checkRow(color, y, cells[y][x], x + 1);

    if (cells[y][x] === color && nextColor === 'grey') {
        cells[y][x] = 'grey';
    }

    return cells[y][x];
}

function checkColumn(color, x, previousColor, y) {

    y = y || 0;

    if (y >= VERT_CELLS) return;

    if (cells[y][x] === color && previousColor === 'grey') {
        cells[y][x] = 'grey';
    }

    var nextColor = checkColumn(color, x, cells[y][x], y + 1);

    if (cells[y][x] === color && nextColor === 'grey') {
        cells[y][x] = 'grey';
    }

    return cells[y][x];
}

function createButtons() {

    var buttons = document.getElementById('buttons');
    buttons.innerHTML = '';

    for (let i = 0; i < COLORS.length; i++) {
        buttons.innerHTML += '<div class="button" id="' + COLORS[i] + '" onclick="pickColor(' + COLORS[i] + ')" style="background-color:' + COLORS[i] + '"></div>';
    }
}

function updateScore(inc) {

    if (inc === 0) {
        score = inc;
    } else {
        score++;
    }

    scoreContext.fillStyle = '#ffffdd';
    scoreContext.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);

    scoreContext.fillStyle = 'black';
    scoreContext.font = "20px arial";
    scoreContext.fillText("SCORE: " + score, scoreCanvas.width/2 - 35, 20);
}

function colorRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}