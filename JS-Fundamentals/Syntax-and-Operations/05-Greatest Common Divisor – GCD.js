function solve(a, b) {
    let t = 0;
    while (a !== 0 ){
        t = b % a;
        b = a;
        a = t;
    }
    return b;
}

console.log(solve(2154, 458));