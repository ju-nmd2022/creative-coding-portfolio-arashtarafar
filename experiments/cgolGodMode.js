// Inspired by explanations of Dan Shiffman on the Coding Train YouTube channel

let grid;
let columns;
let rows;
let resolution = 30;

function make2DArray(cols, rows){
    let array = new Array(cols);
    for(let iterator = 0; iterator < array.length; iterator++){
        array[iterator] = new Array(rows);
    }
    return array;
}

function setup(){
    noCursor();
    dimensionX = windowWidth;
    dimensionY = windowHeight;
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
    background(20);

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

    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            push();
            stroke(20);
            if(grid[i][j] === 1 && next[i][j] === 1){
                fill(78, 130, 117);
            }else if(grid[i][j] === 1 && next[i][j] === 0){
                fill(176, 111, 111);
            }
            else if(grid[i][j] === 0 && next[i][j] === 1){
                fill(78, 93, 210);
            }
            else{
                fill(20);
            }
            rect(i * resolution, j * resolution, resolution, resolution);
            pop();
        }
    }
    push();
    stroke(255);
    fill(78, 93, 210);
    rect(floor(mouseX / resolution) * resolution, floor(mouseY / resolution) * resolution, resolution, resolution);
    pop();

    grid = next;
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

function mouseClicked(){
    grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 1;
}

function mouseDragged(){
    grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 1;
}