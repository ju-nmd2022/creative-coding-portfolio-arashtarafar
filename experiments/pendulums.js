let masterVolume = -5; // in decibels
let ready = false;

// ----------------------------------------------------------------------

function setup(){
    createCanvas(windowWidth, windowHeight);
    Tone.Master.volume.value = masterVolume;
}

// ----------------------------------------------------------------------

function draw(){
    background(20);

    if(ready){
        // do audio things
        
    }else{
        fill(0, 220, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        text("CLICK TO START", width / 2, height / 2);
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

// ----------------------------------------------------------------------

function mousePressed(){
    if(!ready){
        // start audio objects
        Tone.start();
        ready = true;
    }else{
        // stop audio
        Tone.stop();
        ready = false;
    }
}

// ----------------------------------------------------------------------

class Pendulum{
    constructor(frequency, note){
        this.frequency = frequency;
        this.note = note;

        this.lfo = new Tone.LFO(0.85);
        this.lfo.start();
        this.meter = new Tone.Meter();
        this.meter.normalRange = true; // 0 to 1 instead of dB
        this.lfo.connect(meter);

        this.synth = new Tone.Synth();
        this.synth.connect(Tone.Master);

        this.prevPos = 0;
    }

    run(){
        let pos = 0.5 - this.meter.getValue(0); // between -0.5 and 0.5

        let x = map(pos, -0.5, 0.5, width / 4, width * 3 / 4);

        let left = pos > 0 && this.prevPos < 0;
        let right = this.prevPos > 0 && pos < 0;

        if(left || right){
            // trigger a note
            this.synth.triggerAttackRelease("C4", "8n");
        }

        this.prevPos = pos;

        fill(0, 220, 0);
        stroke(0, 220, 0);
        line(x, 50, width / 2, 0);
        ellipse(x, 50, 20, 20);
    }
}