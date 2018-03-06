const game= new Game(30, 20);
game.generateMatrix();
game.render();

class Game {

    constructor(width, height) {
        this.w = width;
        this.h = height;
        this.matrix = generateMatrix();
        this.cursor = [0, 0];
        this.colors = ['cyan', 'magenta', 'red', 'green', 'yellow'];
    }

    generateMatrix() {

        this.matrix = [];

        var row;
        var cell;

        for (var i = 0; i < this.h; i++) {

            row = [];

            for (var j = 0; j < this.w; j++) {

                cell = {
                    x: j,
                    y: i,
                    color: this.colors[Math.floor(this.colors.length*Math.random())],
                    id: this.x + ':' + this.y
                };

                row.push(cell);
            }

            this.matrix.push(row);
        }

        var firstCell = this.matrix[0][0];
        firstCell.color = 'grey';
    }

    changeColor(color) {
        
    }

    render() {
        var map = document.getElementById('map');
        map.innerHTML += '<div class="block" id="' +  +  '"></div>';
    }
}
