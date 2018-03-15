var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');

var counter = 0;
var counterCanvas = document.getElementById('counter');
var counterContext = counterCanvas.getContext('2d');

var cells = [];
const COLORS = ['blue', 'red', 'yellow', 'green', 'magenta', 'orange'];
const CELL_SIZE = 20; // size in pixels

const HORZ_CELLS = Math.floor(canvas.width/CELL_SIZE);
const VERT_CELLS = Math.floor(canvas.height/CELL_SIZE);

window.onload = () => {
    generateMap();
    createButtons();
}

function generateMap() {


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

function drawBoard() {

    // Draw every square with the updated color
    for (let h = 0; h < VERT_CELLS; h++) {
        for (let w = 0; w < HORZ_CELLS; w++) {
            colorRect(w * CELL_SIZE, h * CELL_SIZE, CELL_SIZE, CELL_SIZE, cells[h][w]);
        }
    }
}

function pickColor(button) {

    let color = button.id;

    for (let y = 0; y < VERT_CELLS; y++) {
        for (let x = 0; x < HORZ_CELLS; x++) {
            checkRow(color, y);
            checkColumn(color, x);
        }
    }

    drawBoard();
    updateCounter();
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
    for (let i = 0; i < COLORS.length; i++) {
        var buttons = document.getElementById('buttons');
        buttons.innerHTML += '<div class="button" id="' + COLORS[i] + '" onclick="pickColor(' + COLORS[i] + ')" style="background-color:' + COLORS[i] + '"></div>';
    }
}

function updateCounter() {

    counter++;

    counterContext.fillStyle = 'black';
    counterContext.fillRect(0, 0, 50, 50);

    counterContext.fillStyle = 'white';
    counterContext.fillText(counter, 10, 10);
}

function colorRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}