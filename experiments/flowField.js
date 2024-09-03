let points;
let directionChangeRate;
let density;
let gap;

let r1, r2, g1, g2, b1, b2;

function setup(){
    points = [];
    density = 55;
    gap = width / density;

    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    // noLoop();
    background(0);
    angleMode(DEGREES); 
    noiseDetail(1);    

    for(let x = 0; x < width; x += gap){
        for(let y = 0; y < height; y += gap){
            points.push(createVector(x + random(-10, 10), y + random(-10, 10)));
        }
    }

    shuffle(points, true);

    r1 = random(255);
    r2 = random(255);
    g1 = random(255);
    g2 = random(255);
    b1 = random(255);
    b2 = random(255);

    directionChangeRate = random(0.001, 0.009);
}
function draw(){
    noStroke();

    let max;

    if(frameCount <= points.length){
        max = frameCount;
    } else{
        max = points.length; 
    }

    for(let iterator = 0; iterator < max; iterator++){
        push();
        let r = map(points[iterator].x, 0, width, r1, r2);
        let g = map(points[iterator].y, 0, height, g1, g2); 
        let b = map(points[iterator].x, 0, width, b1, b2);
        let alpha = map(dist(width/2, height/2, points[iterator].x, points[iterator].y), 0, 400, 255, 0);
        fill(r, g, b, alpha);
        ellipse(points[iterator].x, points[iterator].y, 1);
        pop();
        let angle = map(noise(points[iterator].x * directionChangeRate, points[iterator].y * directionChangeRate), 0, 1, 0, 720);
        points[iterator].add(createVector(cos(angle), sin(angle)));
    }
}

function doubleClicked(){
    saveCanvas("flowField", "png");  
} 