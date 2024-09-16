let grid;
let columns = 10;
let rows = 0;

function make2DArray(cols, rows){
    let array = new Array(cols);
    for(let iterator = 0; iterator < array.length; iterator++){
        array[iterator] = new Array(rows);
    }
    return array;
}

function setup(){
    grid = make2DArray(columns, rows);
    for(let i = 0; i < columns; i++){
        for(j = 0; j < rows; j++){
            grid[i][j] = floor(random(2));
        }
    }
}
function draw(){

}