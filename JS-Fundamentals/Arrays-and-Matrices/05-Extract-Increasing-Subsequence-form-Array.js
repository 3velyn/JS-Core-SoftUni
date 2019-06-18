function solve(arr) {
    let newArr = [];
    let biggestNum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= biggestNum) {
            biggestNum = arr[i];
            newArr.push(arr[i]);
        }
    }
    console.log(newArr.join('\n'));
}

solve([20,
    3,
    2,
    15,
    6,
    1]
);