let masterVolume = -5; // in decibels
let ready = false;
// let osc, osc2;
let wave;
// let lfo; // low frequency oscillator
let synth;
let loop;

let scale;

let prevNote;

// ----------------------------------------------------------------------

function setup(){
    createCanvas(windowWidth, windowHeight);

    // -----------------------------------------------------------------oscillator #1

    // osc = new Tone.Oscillator(); // methods return the object so they can be chained together

    // osc.type = "square";

    // osc.volume.value = -10;

    /*
    // another way of building an oscillator. passing all parameters in object constructor

    osc = new Tone.Oscillator({
        type: "square",
        frequency: 220,
        volume: -10
    });

    */

    // osc.connect(Tone.Master);

    // osc.frequency.value = 240; // set the initial frequency

    // osc.toDestination();

    // // -----------------------------------------------------------------oscillator #2

    // osc2 = new Tone.Oscillator(); // methods return the object so they can be chained together
    // // osc.connect(Tone.Master);

    // osc2.frequency.value = 220; // set the initial frequency

    // // osc2.toDestination();

    // // -----------------------------------------------------------------low frequency oscillator
    // lfo = new Tone.LFO("0.1hz", 210, 230);
    // lfo.connect(osc.frequency);

    scale = Tonal.Scale.get("C4 minor").notes;
}

function initializeAudio(){
    synth = new Tone.AMSynth();
    synth.oscillator.type = "sine";
    synth.connect(Tone.Master); // or synth.toDestination();

    loop = new Tone.Loop( (time) => {
         // let note = random(scale);
        let n = noise(frameCount * 0.1);
        let i = floor(map(n, 0, 1, 0, scale.length));

        let note = scale[i];

        if(prevNote != note){
            // (freq, noteDuration, time = now)
            synth.triggerAttackRelease(note, "16n", time);

            prevNote = note;
        }
    }, "16n");
    loop.start();

    // create a waveform and connect the output volume to it
    wave = new Tone.Waveform();
    Tone.Master.connect(wave);

    Tone.Master.volume.value = masterVolume;
    // Tone.Master.volume.rampTo(-15, 3); // volume can be changed linearly over time
}

// ----------------------------------------------------------------------

// function loopStep(time){
//     // let note = random(scale);
//     let n = noise(frameCount * 0.1);
//     let i = floor(map(n, 0, 1, 0, scale.length));

//     let note = scale[i];

//     if(prevNote != note){
//         // (freq, noteDuration, time = now)
//         synth.triggerAttackRelease(note, "16n", time);

//         prevNote = note;
//     }
// }

// ----------------------------------------------------------------------

function draw(){
    background(20);

    if(ready){
        // do the audio
        // osc.frequency.value = map(mouseX, 0, width, 110, 880); // change the frequency with mouse movement

        drawWaveform(wave);
    }else{
        fill(0, 220, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        text("CLICK TO START", width / 2, height / 2);
    }
}

// ----------------------------------------------------------------------#

function drawWaveform(wave, w = width, h = height){
    stroke(0, 220, 0);
    let buffer = wave.getValue(0); // get the value of first index of the oscillator's waveform

    // find the first stable zero point (trigger point) in the waveform in order to always draw from there
    let start = 0;
    for(let i = 1; i < buffer.length; i++){
        if(buffer[i - 1] < 0 && buffer[i] >= 0){
            start = i;
            break;
        }
    }

    // calculate an end point so we only draw a part of the waveform
    let end = start + buffer.length / 2;

    // draw the waveform
    noFill();
    beginShape();
    for(let i = start; i < end; i++){
        let x = map(i, start, end, 0, width);
        let y = map(buffer[i], -1, 1, 0, height);
        curveVertex(x, y);
    }
    endShape();
}

// ----------------------------------------------------------------------

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

// ----------------------------------------------------------------------

function mousePressed(){
    if(!ready){
        // start audio objects

        // osc.start();
        // osc2.start();
        // lfo.start();
        
        initializeAudio();
        Tone.Transport.start();
        
        ready = true;
    }else{
        // osc.stop();
        // osc2.stop();
        // lfo.stop();

        Tone.Transport.stop();

        ready = false;
    }
}

// ----------------------------------------------------------------------