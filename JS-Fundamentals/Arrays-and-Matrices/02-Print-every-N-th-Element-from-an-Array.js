function solve(arr) {
    let n = arr[arr.length - 1];
    arr.pop();
    for (let i = 0; i < arr.length; i++) {
        if (((i ) % n === 0) || i === 0) {
            console.log(arr[i]);
        }
    }
}

solve(['dsa',
    'asd',
    'test',
    'tset',
    '2']
);