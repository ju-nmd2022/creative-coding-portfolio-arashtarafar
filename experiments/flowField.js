let points = [];
let directionChangeRate = 0.008;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(30);
    angleMode(DEGREES);
    noiseDetail(1);

    let density = 20;
    let gap = width / density;

    for(let x = 0; x < width; x += gap){
        for(let y = 0; y < height; y += gap){
            points.push(createVector(x + random(-10, 10), y + random(-10, 10)));
        }
    }
}
function draw(){
    noStroke();

    for(let point of points){
        let r = map(point.x, 0, width, 150, 255);
        let g = map(point.x, 0, height, 50, 255);
        let b = map(point.x, 0, width, 255, 50);
        fill(r, g, b);

        ellipse(point.x, point.y, 1);
        let angle = map(noise(point.x * directionChangeRate, point.y * directionChangeRate), 0, 1, 0, 720);
        point.add(createVector(cos(angle), sin(angle)));
    }
}