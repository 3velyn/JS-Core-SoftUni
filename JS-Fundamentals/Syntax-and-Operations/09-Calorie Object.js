function solve(arr) {
    let obj = {};
    
    for (let i = 0; i < arr.length; i++){
        if (i % 2 === 1){
            let food = arr[i-1];
            obj[food] = Number(arr[i]);
        }
    }

    return obj;
}


// console.log(solve(['Potato', 93, 'Skyr', 63, 'Cucumber', 18, 'Milk', 42]));