let walker;
let stepSize = 10;

class Walker{
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.tx = 0;
        this.ty = 1000;
    }
    show(){
        push();
        noStroke();
        fill(50, 50, 120, 50);
        // point(this.x, this.y);
        circle(this.x, this.y, 40);
        pop();
    }
    step(){
        const choice = floor(random(4));
        if(choice === 0) this.x++;
        else if(choice === 1) this.x--;
        else if(choice === 2) this.y++;
        else this.y--;
    }
    complexStep(){
        const xStep = random(-1, 1.1) * 1;
        const yStep = random(-1, 1.1) * 1;
        this.x += xStep;
        this.y += yStep;
    }
    mouseStep(){
        const determinant = random(1);
        if(determinant < 0.2){
            if(this.x < mouseX)this.x+=stepSize;
            else if(this.x > mouseX)this.x-=stepSize;
            if(this.y < mouseY)this.y+=stepSize;
            else if(this.y > mouseY)this.y-=stepSize;
        }
        else if (determinant < 0.4)this.x+=stepSize/2;
        else if (determinant < 0.6)this.x-=stepSize/2;
        else if (determinant < 0.8)this.y+=stepSize/2;
        else this.y-=stepSize/2;
    }
    noiseStep(){
        this.x = map(noise(this.tx), 0 , 1, 0, width);
        this.y = map(noise(this.ty), 0 , 1, 0, height);
        this.tx += 0.01;
        this.ty += 0.01;
    }
}
function setup(){
    walker = new Walker();
    background(255);
    frameRate(30);
}
function draw(){
    background(141, 141, 243, 10);
    walker.mouseStep();
    walker.show();
}