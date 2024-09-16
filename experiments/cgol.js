// Inspired by explanations of Dan Shiffman on the Coding Train YouTube channel

let grid;
let columns;
let rows;
let resolution = 15;
let dimensionX = windowWidth;
let dimensionY = windowHeight;

function make2DArray(cols, rows){
    let array = new Array(cols);
    for(let iterator = 0; iterator < array.length; iterator++){
        array[iterator] = new Array(rows);
    }
    return array;
}

function setup(){
    createCanvas(dimensionX, dimensionY);
    columns = floor(dimensionX / resolution);
    rows = floor(dimensionY / resolution);
    
    grid = make2DArray(columns, rows);
    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            grid[i][j] = floor(random(2));
        }
    }
}
function draw(){
    background(0);

    let next = make2DArray(columns, rows);

    // compute next generation
    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            
                let sum = countNeighbors(grid, i, j);
                let state = grid[i][j];
                if(state === 1 && sum === 3){
                    next[i][j] = 1;
                } else if(state === 1 && (sum < 2 || sum > 3)){
                    next[i][j] = 0;
                } else if(state === 0 && sum === 3){
                    next[i][j] = 1;
                } else{
                    next[i][j] = grid[i][j];
                }
            
        }
    }

    grid = next;

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

function countNeighbors(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += grid[(x + i + columns) % columns][(y + j + rows) % rows];
        }
    }
    sum -= grid[x][y];
    return sum;
}