function setup(){
    createCanvas(500, 400);
    // frameRate(60);
    noLoop();
}

const width = 75;
const height = width * sin(PI / 3) * 2 / 3;
let significance = Math.ceil(Math.random());


function triangleCell(cellWidth, sizeProportion){
    sizeProportion = Math.random();
    const edgeLength = sizeProportion * cellWidth * 2 / 3;

    fill(50);
    strokeWeight(0);
    noStroke();
    triangle(0, cellWidth * 2 / 3, edgeLength * cos(PI/3), cellWidth * 2 / 3 - edgeLength * sin(PI/3), edgeLength, cellWidth * 2 / 3);
    translate(cellWidth * 2 / 6, 0);
    triangle(cellWidth * 2 / 3 - edgeLength, 0, cellWidth * 2 / 3 - edgeLength * cos(PI/3), edgeLength * sin(PI/3), cellWidth * 2 / 3, 0);
}

function draw(){
    background(255);
    triangleCell(width, significance);
}