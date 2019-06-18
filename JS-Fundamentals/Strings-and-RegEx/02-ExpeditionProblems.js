function solve() {
    let str = document.getElementById('str').value;
    let text = document.getElementById('text').value;
    let result = document.getElementById('result');

    let regex = /(north|east)[\s\S]*?(\d{2})[^,]*?,[^,]*?(\d{6})/gmi;
    let matches = directionMatches(regex, text);

    let coordinates = [
        {
            'direction': 'north',
            'degrees': 0,
            'minutes': 0
        },
        {
            'direction': 'east',
            'degrees': 0,
            'minutes': 0
        }
    ];
    
    for (let i = 0; i < matches.length; i++) {
        for (let coords of coordinates) {
            if (matches[i][1].toLowerCase() === coords.direction) {
                coords.degrees = matches[i][2];
                coords.minutes = matches[i][3];
            }
        }
    }

    let startOfMessage = text.indexOf(str) + str.length;
    let endOfMessage = text.substr(startOfMessage).indexOf(str);
    let message = text.substr(startOfMessage, endOfMessage);

    let pN = document.createElement('p');
    pN.textContent = `${coordinates[0].degrees}.${coordinates[0].minutes} N`;

    let pE = document.createElement('p');
    pE.textContent = `${coordinates[1].degrees}.${coordinates[1].minutes} E`;

    let pM = document.createElement('p');
    pM.textContent = `Message: ${message}`;

    result.appendChild(pN);
    result.appendChild(pE);
    result.appendChild(pM);


    function directionMatches(regex, text) {
        let result = [];
        while (1) {
            let currMatch = regex.exec(text);

            if (currMatch === null) {
                break;
            } else {
                result.push(currMatch);
            }
        }
        return result;
    }
}
