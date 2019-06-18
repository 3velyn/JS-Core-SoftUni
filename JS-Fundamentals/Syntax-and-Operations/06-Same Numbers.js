function solve(n) {
    let number = n.toString();
    let same = true;
    let firstDigit = number[0];
    let sum = 0;
    
    for (let i = 0; i < number.length; i++){
        if (firstDigit !== number[i]) {
            same = false;
        }
        sum += +number[i];
    }

    console.log(same);
    console.log(sum);

}

// solve(1234);