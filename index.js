const generateColor = () => {

    const colorArray = ["cyan", "magenta", "yellow", "green", "purple", "red"];
    let randomIndex = Math.floor(6 * Math.random());
    let color = colorArray[randomIndex];
    return color;

}

const generateMap = () => {

    const mainDiv = document.getElementById('wrapper'); 

    for (let i = 0; i < 600; i++) {
        if (i === 0) mainDiv.innerHTML += '<div class="block" id="block0" style="background-color:grey;"></div>';
        else mainDiv.innerHTML += '<div class="block" id="block' + i + '" style="background-color:' + generateColor() + ';"></div>';
    }
};

const onLoad = () => {
    generateMap();
}

document.body.onload = onLoad;