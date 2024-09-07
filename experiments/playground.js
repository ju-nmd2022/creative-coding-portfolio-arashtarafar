let walker;

class Walker{
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.tx = 0;
        this.ty = 1000;
    }
    show(){
        stroke(0);
        strokeWeight(1.5);
        fill(120);
        // point(this.x, this.y);
        circle(this.x, this.y, 40);
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
        if(determinant < 0.5){
            if(this.x < mouseX)this.x++;
            else if(this.x > mouseX)this.x--;
            if(this.y < mouseY)this.y++;
            else if(this.y > mouseY)this.y--;
        }
        else if (determinant < 0.625)this.x++;
        else if (determinant < 0.75)this.x--;
        else if (determinant < 0.875)this.y++;
        else this.y--;
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
    frameRate(60);
}
function draw(){
    walker.noiseStep();
    walker.show();
}