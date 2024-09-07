// inspired by the tree rings tutorial on Gorilla Sun

let scale = 55;
let resolution = 0.002;
let numPoints = 30;
let time = 0.01;
let radius = windowHeight > windowWidth? 300 + windowHeight/2: 300 + windowWidth/2;
let numSteps = 200;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    // noLoop(); 
    stroke(10, 0, 60, 100);
    strokeWeight(5);
    noFill();
}
function draw() {
  background(220);
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