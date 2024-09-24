// Following the guide from J Alex Carney on YouTube

let columns;
let rows = 26;
let squareSize = 15;

function setup(){
    createCanvas(windowWidth, windowHeight);
    columns = windowWidth / squareSize;
    squareSize = windowWidth > windowHeight? windowHeight / (rows + 10) : windowWidth / (rows + 5);
    // frameRate(30);
    noLoop();
}
function draw(){
    background(81, 84, 201);
    stroke(220);
    drawSquares();
}
function drawSquares(){
    rectMode(CENTER);
    noFill();
    let pixelY = - 0.5 * squareSize + (height - rows * squareSize) / 2;
    for(let y = 0; y < rows; y++){        
        stroke(81 + (255 - 81) * (y / rows), 84 + (255 - 84) * (y / rows), 201 + (255 - 201) * (y / rows), 255 * (y / rows));
        let pixelX = 1.5 * squareSize + (width - columns * squareSize) / 2;
        for(let x = 0; x < columns; x++){
            push();
            let deltaX = pow(random(-(y / rows), y / rows), 2) * squareSize * 2;
            let deltaY = pow(random(-(y / rows), y / rows), 2) * squareSize * 2;
            translate(pixelX + deltaX, pixelY + deltaY);
            let theta = random(0, 2 * PI * pow(y / rows, 2));
            rotate(theta);
            line(0, -squareSize / 2, 0, squareSize / 2);
            line(-squareSize / 2, 0, squareSize / 2, 0);
            line(-squareSize / 4, squareSize / 4, squareSize / 4, -squareSize / 4);
            line(-squareSize / 4, -squareSize / 4, squareSize / 4, squareSize / 4);
            // square(0, 0, squareSize);
            pop();
            pixelX += squareSize;
        }
        pixelY += squareSize;
    }
}
