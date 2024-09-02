// a heat map block, adapted from classroom smoke example
function setup(){
    createCanvas(500, 500);
    frameRate(120);
}
const dotRadius = 13;
let counter = 0;
const divider = 66;
function draw(){
    background(255);
    for(let x = 0; x < width / dotRadius; x++){
        for(let y = 0; y < height/dotRadius; y++){
            const value = noise(x / divider, y / divider, counter) * dotRadius;
            push();
            colorMode(HSB);
            fill(5 + value * 25, 100, 100);
            noStroke();
            rect(x * dotRadius, y * dotRadius, dotRadius, dotRadius);
            pop();            
        }
    }
    counter += 0.008;
}