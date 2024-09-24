// Following the guide from J Alex Carney on YouTube

let columns;
let rows = 26;
let squareSize = 15;

function setup(){
    createCanvas(windowWidth, windowHeight);
    columns = windowWidth / squareSize;
    squareSize = windowWidth > windowHeight? windowHeight / (rows + 10) : windowWidth / (rows + 5);
    frameRate(3);
    // noLoop();
}
function draw(){
    background(206, 196, 134);
    stroke(220);
    drawSquares();
}
function drawSquares(){
    noStroke();
    let pixelY = - 0.5 * squareSize + (height - rows * squareSize) / 2;
    for(let y = rows - 1; y > 0; y--){        
        fill(206 + (255 - 241) * (y / rows), 196 + (255 - 148) * (y / rows), 134 + (255 - 20) * (y / rows), 255 * (1 - y / rows));
        let pixelX = 1.5 * squareSize + (width - columns * squareSize) / 2;
        for(let x = 0; x < columns; x++){
            push();
            let deltaX = pow(random(-(y / rows), y / rows), 1) * squareSize * 2;
            let deltaY = pow(random(-(y / rows), y / rows), 1) * squareSize * 2;
            translate(pixelX + deltaX, pixelY + deltaY);
            let theta = random(0, 2 * PI * pow(y / rows, 1));
            rotate(theta);            
            beginShape();
            vertex(-squareSize / 4, -squareSize * 3 / 4);
            curveVertex(squareSize / 4, - squareSize / 4);
            curveVertex(squareSize / 8, 0);
            curveVertex(squareSize * 3 / 4, squareSize * 3 );
            endShape(CLOSE);            
            pop();
            pixelX += squareSize;
        }
        pixelY += squareSize;
    }
}
