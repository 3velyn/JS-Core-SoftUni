function solve(arr) {
    let length = Number(arr.pop()) % arr.length;

    while (length--) {
        tem = arr[arr.length - 1];
        arr.unshift(tem);
        arr.pop();
    }
    console.log(arr.join(' '));
}

solve(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15']
);