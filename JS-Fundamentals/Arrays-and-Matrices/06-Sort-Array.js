function solve(arr) {
    arr.sort(function (a, b) {
        if (a.length !== b.length) {
            return a.length - b.length;
        }
        return a.toUpperCase().localeCompare(b.toUpperCase());
    });
    console.log(arr.join('\n'));
}

solve(['test',
    'Deny',
    'omen',
    'Default']
);

//['Isacc',
// 'Theodor',
// 'Jack',
// 'Harrison',
// 'George']

//['test',
//     'Deny',
//     'omen',
//     'Default']