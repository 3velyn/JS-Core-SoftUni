function solve() {
    let menuTo = document.getElementById('selectMenuTo');
    let option = document.querySelector('#selectMenuTo option');

    let opt = ['Binary', 'Hexadecimal'];

    for (let i = 0; i < 2; i++) {
        let currOption = option.cloneNode(true);
        currOption.setAttribute('value', `${opt[i].toLowerCase()}`);
        currOption.textContent = opt[i];

        menuTo.appendChild(currOption);
    }

    document.querySelector('#menus button').addEventListener('click', convert);

    function convert() {
        let number = Number(document.getElementById('input').value);
        let result = document.getElementById('result');

        let selectedIndex = menuTo.selectedIndex;
        let selectedOption = menuTo.getElementsByTagName('option')[selectedIndex].value;

        if (selectedOption === 'binary') {
            number = parseInt(number, 10).toString(2);
        } else if (selectedOption === 'hexadecimal') {
            number = parseInt(number, 10).toString(16).toUpperCase();
        }

        result.setAttribute('value', `${number}`);
    }
}
