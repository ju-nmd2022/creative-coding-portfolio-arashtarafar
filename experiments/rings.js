// inspired by the tree rings tutorial on Gorilla Sun

let scale = 55;
let resolution = 0.002;
let numPoints = 30;
let time = 0.01;
let radius;
let numSteps = 40;

function setup(){
    createCanvas(windowWidth, windowHeight);
    radius = windowWidth > windowHeight ? windowHeight / 2 : windowWidth / 2;
    // frameRate(15);
    noLoop(); 
    stroke(23, 11, 6);
    noFill();
}
function draw() {
  background(237, 227, 202);
  for(let r = 0; r < radius; r += radius / numSteps){
    if(Math.random() < 0.3){
        continue;
    }
    beginShape();
    for(a = 0; a<TAU; a+=TAU/numPoints){
        var x = width / 2 + r*cos(a);
        var y = height / 2 + r*sin(a);

        var n = map(noise(time + x*resolution + r/100, time +  y*resolution + r/100), 0, 1, -scale, scale);
        strokeWeight(0.5);
        // point(x+n, y+n);
        curveVertex(x+n, y+n);

        if(random()>0.9){
          endShape();
          beginShape();
        }
    }
    endShape();
  }
  // time += 0.01;
}