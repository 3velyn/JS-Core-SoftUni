function generateSpiralMatrix(row, col) {
    let rows = row;
    let cols = col;

    let matrix = [];
    for (let row = 0; row < rows; row++) {
        matrix[row] = [];
        for (let col = 0; col < cols; col++) {
            matrix[row][col] = 0;
        }
    }

    let counter = 1;
    let currRow = 0;
    let currCol = 0;
    let direction = 'right';

    for (let i = 0; i < rows * cols; i++) {
        matrix[currRow][currCol] = counter;
        counter++;

        if (direction === 'right') {
            if (currCol + 1 >= cols || matrix[currRow][currCol + 1] !== 0) {
                direction = 'down';
                currRow++;
            } else {
                currCol++;
            }
        } else if (direction === 'down') {
            if (currRow + 1 >= rows || matrix[currRow + 1][currCol] !== 0) {
                direction = 'left';
                currCol--;
            } else {
                currRow++;
            }
        } else if (direction === 'left') {
            if (currCol - 1 < 0 || matrix[currRow][currCol - 1] !== 0) {
                direction = 'up';
                currRow--;
            } else {
                currCol--;
            }
        } else if (direction === 'up') {
            if (currRow - 1 < 0 || matrix[currRow - 1][currCol] !== 0) {
                direction = 'right';
                currCol++;
            } else {
                currRow--;
            }
        }
    }
    console.log(matrix.map(x => x.join(' ')).join('\n'));
}