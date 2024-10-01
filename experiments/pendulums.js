// Following Tone and Tonal tutorials by David Bouchard on YouTube

let masterVolume = -5; // in decibels
let ready = false;

let pendulums = [];

let scale;

let mixer;

// ----------------------------------------------------------------------

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function initializeAudio(){
    Tone.Master.volume.value = masterVolume;

    mixer = new Tone.Gain();

    let reverb = new Tone.Reverb({
        wet: 0.5,
        decay: 20
    });
    mixer.connect(reverb);

    reverb.connect(Tone.Master);

    let style = "major pentatonic";
    scale = Tonal.Scale.get("A3 " + style).notes;
    scale = scale.concat(Tonal.Scale.get("A5 " + style).notes);
    // scale = scale.concat(Tonal.Scale.get("A5 " + style).notes);

    // scale = Tonal.Collection.shuffle(scale);

    for(let i = 0; i < scale.length; i++){
        pendulums[i] = new Pendulum(0.85 + i * (1/60), scale[i]);
    }
}

// ----------------------------------------------------------------------

function draw(){
    background(20);

    if(ready){
        // do audio things
        for(p of pendulums){
            p.run();
            translate(0, height / pendulums.length);
        }
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
        initializeAudio();
        Tone.Transport.start();
        ready = true;
    }else{
        // stop audio
        Tone.Transport.stop();
        ready = false;
    }
}

// ----------------------------------------------------------------------

class Pendulum{
    constructor(frequency, note){
        this.frequency = frequency * 0.3;
        this.note = note;

        this.lfo = new Tone.LFO(this.frequency);
        this.lfo.start(1); // set the start schedule time as parameter i.e. delay start time by 1s
        this.meter = new Tone.Meter();
        this.meter.normalRange = true; // 0 to 1 instead of dB
        this.lfo.connect(this.meter);

        this.synth = new Tone.Synth();
        this.synth.connect(mixer);

        this.prevPos = 0;
    }

    run(){
        let pos = 0.5 - this.meter.getValue(0); // between -0.5 and 0.5

        let x = map(pos, -0.5, 0.5, width / 4, width * 3 / 4);

        let left = pos > 0 && this.prevPos < 0;
        let right = this.prevPos > 0 && pos < 0;

        if(left || right){
            // trigger a note
            this.synth.triggerAttackRelease(this.note, "8n");
            this.note = scale[floor(random(0, scale.length))];
        }

        this.prevPos = pos;

        fill(0, 220, 0);
        stroke(0, 220, 0);
        line(x, 50, width / 2, 0);
        ellipse(x, 50, 20, 20);
    }
}