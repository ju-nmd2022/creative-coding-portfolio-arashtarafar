// a heat map block, adapted from classroom smoke example
function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(120);
}
let dotRadius = 12;
let counterChangeRate = 0.008;
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
    counter += counterChangeRate;
}
function keyPressed(){
    if(counterChangeRate < 0.003) return;
    dotRadius++;
    counterChangeRate -= 0.001;
}
function mouseClicked(){
    if(mouseButton === LEFT){
        if(dotRadius < 3) return;
        dotRadius--;
        counterChangeRate += 0.001;
    }
}