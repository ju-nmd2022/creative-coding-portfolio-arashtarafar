// inspired by the tree rings tutorial on Gorilla Sun

let scale = 55;
let resolution = 0.002;
let numPoints = 30;
let time = 0.01;
let radius = 200;
let numSteps = 100;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    // noLoop(); 
    stroke(110, 10, 160, 100);
    strokeWeight(3);
    noFill();
}
function draw() {
  background(20, 5, 30);
  for(let r = 0; r < radius; r += radius / numSteps){
    if(Math.random() < 0.3){
        continue;
    }
    beginShape();
    for(a = 0; a<TAU; a+=TAU/numPoints){
        var x = width / 2 + r*cos(a);
        var y = height / 2 + r*sin(a);

        var n = map(noise(time + x*resolution + r/100, time +  y*resolution + r/100), 0, 1, -scale, scale);

        // point(x+n, y+n);
        curveVertex(x+n, y+n);
    }
    endShape(CLOSE);
  }
  time += 0.01;
}