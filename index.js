const COLOR_ARRAY = ["cyan", "yellow", "green", "purple", "red"];

const generateColor = () => {

    let randomIndex = Math.floor(5 * Math.random());
    let color = COLOR_ARRAY[randomIndex];
    return color;

}

const generateMap = () => {

    const mainDiv = document.getElementById('map'); 

    for (let i = 0; i < 600; i++) {
        if (i === 0) mainDiv.innerHTML += '<div class="block" id="block0" style="background-color:grey;"></div>';
        else mainDiv.innerHTML += '<div class="block" id="block' + i + '" style="background-color:' + generateColor() + ';"></div>';
    }
};

const generateButtons = () => {

    const buttonDiv = document.getElementById('buttons');

    COLOR_ARRAY.forEach(element => {
        buttonDiv.innerHTML += '<div class="button" style="background-color:' + element + '">';
    });
}

const onLoad = () => {
    generateMap();
    generateButtons();
}

document.body.onload = onLoad;