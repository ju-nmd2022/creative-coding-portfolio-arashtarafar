let points = [];
let directionChangeRate = 0.004;
let density = 55;
let gap = width / density;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    background(30);
    angleMode(DEGREES);
    noiseDetail(1);    

    for(let x = 0; x < width; x += gap){
        for(let y = 0; y < height; y += gap){
            points.push(createVector(x + random(-10, 10), y + random(-10, 10)));
        }
    }
}
function draw(){
    noStroke();

    for(let point of points){
        push();
        let r = map(point.x, 0, width, 150, 255);
        let g = map(point.x, 0, height, 70, 255);
        let b = map(point.x, 0, width, 255, 50);
        let alpha = map(dist(width/2, height/2, point.x, point.y), 0, 400, 175, 0);
        fill(r, g, b, alpha);
        ellipse(point.x, point.y, 1);
        pop();
        let angle = map(noise(point.x * directionChangeRate, point.y * directionChangeRate), 0, 1, 0, 720);
        point.add(createVector(cos(angle), sin(angle)));
    }
}

function doubleClicked(){
    createCanvas(windowWidth, windowHeight);
    background(30);
    while(points.length > 0){
        points.pop();
    }
    for(let x = 0; x < width; x += gap){
        for(let y = 0; y < height; y += gap){
            points.push(createVector(x + random(-10, 10), y + random(-10, 10)));
        }
    }
}