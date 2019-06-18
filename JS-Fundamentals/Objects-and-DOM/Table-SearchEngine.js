function solve() {
    function containsQuerry(array, querry) {
        for (let i = 0; i < array.length; i++) {
            return array.filter(x => x.textContent.toLowerCase().includes(querry))
                .map(x => array.indexOf(x));
        }
    }

    let tdValues = [];
    Array.from(document.querySelectorAll('tbody tr td'))
        .forEach(x => tdValues.push(x));

    Array.from(document.querySelectorAll('tbody tr td'))
        .forEach((x, y) => x.setAttribute('id', y));

    document.getElementById('searchBtn').addEventListener('click', (x) => {
        Array.from(document.querySelectorAll('tbody tr'))
            .forEach(x => x.removeAttribute('class', 'select'));

        let searchQuerry = document.getElementById('searchField').value.toLowerCase();
        
        if (searchQuerry.length === 0) return;


        containsQuerry(tdValues, searchQuerry)
            .forEach(x => tdValues[x].parentElement.setAttribute('class', 'select'))

        document.getElementById('searchField').value = '';
    })

}
