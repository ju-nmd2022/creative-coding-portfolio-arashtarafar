// Following the guide from J Alex Carney on YouTube

let columns = 12;
let rows = 26;
let squareSize = 15;

function setup(){
    createCanvas(windowWidth, windowHeight);
    squareSize = windowWidth > windowHeight? windowHeight / (rows + 10) : windowWidth / (rows + 5);
    // frameRate(30);
    noLoop();
}
function draw(){
    background(225);
    drawSquares();
}
function drawSquares(){
    rectMode(CENTER);
    noFill();
    let pixelY = - 0.5 * squareSize + (height - rows * squareSize) / 2;
    for(let y = 0; y < rows; y++){
        let pixelX = 1.5 * squareSize + (width - columns * squareSize) / 2;
        for(let x = 0; x < columns; x++){
            push();
            let deltaX = pow(random(-(y / rows), y / rows), 2) * squareSize * 2;
            let deltaY = pow(random(-(y / rows), y / rows), 2) * squareSize * 2;
            translate(pixelX + deltaX, pixelY + deltaY);
            let theta = random(0, 2 * PI * pow(y / rows, 2));
            rotate(theta);
            square(0, 0, squareSize);
            pop();
            pixelX += squareSize;
        }
        pixelY += squareSize;
    }
}
