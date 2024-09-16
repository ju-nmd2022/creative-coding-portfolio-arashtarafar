let grid;
let columns;
let rows;
let resolution = 10;
let dimension = 400;

function make2DArray(cols, rows){
    let array = new Array(cols);
    for(let iterator = 0; iterator < array.length; iterator++){
        array[iterator] = new Array(rows);
    }
    return array;
}

function setup(){
    createCanvas(dimension, dimension);
    columns = dimension / resolution;
    rows = dimension / resolution;
    
    grid = make2DArray(columns, rows);
    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            grid[i][j] = floor(random(2));
        }
    }
}
function draw(){
    background(0);
    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            push();
            if(grid[i][j] === 1){
                fill(255);
            }
            else{
                fill(0);
            }
            rect(i * resolution, j * resolution, resolution, resolution);
            pop();
        }
    }
}