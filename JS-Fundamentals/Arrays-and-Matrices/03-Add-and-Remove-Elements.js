function solve(cmd) {
    let initialNum = 0;
    let arr  = [];

    for (let i = 0; i < cmd.length; i++) {
        initialNum++;
        if (cmd[i] === 'add') {
            arr.push(initialNum);
        }else {
            arr.pop();
        }
    }

    if (arr.length === 0) {
        console.log('Empty');
    }else {
        console.log(arr.join('\n'));
    }
}

solve(['remove',
    'remove',
    'remove']
);