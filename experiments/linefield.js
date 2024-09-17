// a heat map block, adapted from classroom smoke example
let dotRadius = 20;
let counterChangeRate = 0.01;
let counter = 0;
const divider = 66;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}
function draw(){
    background(20);
    for(let x = 0; x < width / dotRadius; x++){
        for(let y = 0; y < height/dotRadius; y++){
            let value = noise(x / divider, y / divider, counter) * dotRadius;
            push();
            colorMode(HSB);
            stroke(5 + value * 25, 100, 100);
            strokeWeight(value);
            translate(x * dotRadius, y * dotRadius);
            rotate(map(value, 0, dotRadius, 0, 2 * PI));
            fill(255);            
            let lineLength = map(value, 0, dotRadius, 0, dotRadius / (cos(PI/4)));
            if(value < random(dotRadius))
            line(0, 0, lineLength, lineLength);
            pop();            
        }
    }
    counter += counterChangeRate;
}
// function keyPressed(){
//     if(counterChangeRate < 0.003) return;
//     dotRadius++;
//     counterChangeRate -= 0.001;
// }
// function mouseClicked(){
//     if(mouseButton === LEFT){
//         if(dotRadius < 3) return;
//         dotRadius--;
//         counterChangeRate += 0.001;
//     }
// }