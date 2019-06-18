function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_SJo8PnlFV/';
    const countriesCollection = 'countries';
    const townsCollection = 'towns';
    const username = 'guest';
    const password = 'guest';
    const authHeaders = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('#list-countries').on('click', getCountries);
    $('#add-country').on('click', addCountry);

    async function getCountries() {
        try {
            let countries = await $.ajax({
                method: 'GET',
                url: `${baseUrl}appdata/${appKey}${countriesCollection}`,
                headers: authHeaders
            });
            listCountries(countries);
        } catch (e) {
            console.log(e);
        }
    }

    function listCountries(countries) {
        $('#countries').empty();
        sortByName(countries);
        countries.forEach(c => listCountry(c));
    }

    function listCountry(country) {
        let $countryDiv = $(`
                <div class="card border-primary mt-2" id="${country._id}" >
                    <div class="card-header"><h3>${country.name}</h3></div>
                    <div class="card-body">
                        <button id="edit-country" class="btn btn-outline-primary">Edit</button>
                        <button id="delete-country" type="button" class="btn btn-outline-primary">Delete</button>
                        <button id="show-towns" class="btn btn-outline-primary">Show Towns</button>
                        <button id="add-town" class="btn btn-outline-primary">Add Town</button>
                    </div>
                    <div class="input-group mt-2" id="edit-country-form" style="display: none;">
                        <input type="text" class="form-control" placeholder="Country Name">
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button">Change</button>
                        </div>
                    </div>
                    <div class="input-group mt-2" id="add-town-form" style="display: none;">
                        <input type="text" class="form-control" placeholder="Town Name">
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button" id="add-town-name">Add Town</button>
                        </div>
                    </div>
                    <div class="alert alert-primary mt-2" role="alert" style="display: none;">
                      Are you sure?
                      <button class="btn btn-primary float-right">Yes, Delete it</button>
                    </div>
                    <div id="towns" style="display: none;"></div>
                </div>
            `);

        $countryDiv.find('#edit-country').on('click', () => {
            $countryDiv.find('#edit-country-form').toggle();
            $countryDiv.find('#edit-country-form button').on('click', () => editCountry(country._id));
        });

        $countryDiv.find('#delete-country').on('click', () => {
            $countryDiv.find('.alert').toggle();
            $countryDiv.find('.alert button').on('click', () => deleteCountry(country._id));
        });

        $countryDiv.find('#show-towns').on('click', () => {
            if ($countryDiv.find('#towns').css('display') === 'none') {
                $countryDiv.find('#towns').show();
                getTowns(country._id, country.name);
            } else {
                $countryDiv.find('#towns').hide();
            }
        });

        $countryDiv.find('#add-town').on('click', () => {
            $countryDiv.find('#add-town-form').toggle();
            $countryDiv.find('#add-town-name').on('click', () => addTown(country._id, country.name));
        });

        $('#countries').append($countryDiv);

    }

    async function addCountry() {
        try {
            let $countryName = $('#county-name');
            let country = {name: $countryName.val()};
            $countryName.val('');

            await $.ajax({
                method: 'POST',
                url: `${baseUrl}appdata/${appKey}${countriesCollection}/`,
                headers: authHeaders,
                data: JSON.stringify(country)
            });
            getCountries();
        } catch (e) {
            console.log(e);
        }
    }

    async function editCountry(id) {
        console.log(id);
        try {
            let $countryName = $(`#${id} #edit-country-form input`);
            let countryNameChange = { name: $countryName.val()};
            $countryName.val('');

            await $.ajax({
                method: 'PUT',
                url: `${baseUrl}appdata/${appKey}${countriesCollection}/${id}`,
                headers: authHeaders,
                data: JSON.stringify(countryNameChange)
            });

            getCountries();
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteCountry(id) {
        try {
            await $.ajax({
                method: 'DELETE',
                url: `${baseUrl}appdata/${appKey}${countriesCollection}/${id}`,
                headers: authHeaders
            });
            $(`#${id}`).remove();
        } catch (e) {
            console.log(e);
        }
    }

    async function getTowns(id, country) {
        try {
            let towns = await $.ajax({
                method: 'GET',
                url: `${baseUrl}appdata/${appKey}${townsCollection}`,
                headers: authHeaders
            });
            towns = towns.filter(t => t.country === country);
            listTowns(id, towns, country);
        } catch (e) {
            console.log(e);
        }
    }

    function listTowns(id, towns, country) {
        console.log(towns);
        let $townsDiv = $(`#${id} #towns`);
        $townsDiv.empty();

        sortByName(towns);

        for (let town of towns) {
            let $townDiv = $(`
                <div class="card container border-primary mt-2" id="${town._id}">
                    <div class="card-body">
                        <h5>${town.name}</h5>
                        <button id="edit-town" class="btn btn-outline-primary float-right">Edit</button>
                        <button id="delete-town" type="button" class="btn btn-outline-primary float-right">Delete</button>
                    </div>
                    <div class="input-group mt-2 mb-2" id="edit-town-form" style="display: none;">
                        <input type="text" class="form-control" placeholder="Town Name">
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button" >Change</button>
                        </div>
                    </div>
                    <div class="alert alert-primary mt-2" role="alert" style="display: none;">
                      Are you sure?
                      <button class="btn btn-primary float-right">Yes, Delete it</button>
                    </div>
                </div>
            `);

            $townDiv.find('#edit-town').on('click', () => {
                $townDiv.find('#edit-town-form').toggle();
                $townDiv.find('#edit-town-form button').on('click', () => editTown(town._id, id, country));
            });

            $townDiv.find('#delete-town').on('click', () => {
                $townDiv.find('.alert').toggle();
                $townDiv.find('.alert button').on('click', () => deleteTown(town._id));
            });

            $townsDiv.append($townDiv);
        }
    }

    async function addTown(id, country) {
        try {
            let $town = $(`#${id} #add-town-form input`);
            let townInfo = {
                country,
                name: $town.val()
            };
            $town.val('');

            await $.ajax({
                method: 'POST',
                url: `${baseUrl}appdata/${appKey}${townsCollection}/`,
                headers: authHeaders,
                data: JSON.stringify(townInfo)
            });

            getTowns(id, country);
        } catch (e) {
            console.log(e);
        }
    }

    async function editTown(idTown, idCountry, country) {

        try {
            let $townName = $(`#${idCountry} #${idTown} #edit-town-form input`);
            let townInfo = {
                country,
                name: $townName.val()
            };
            $townName.val('');

            await $.ajax({
                method: 'PUT',
                url: `${baseUrl}appdata/${appKey}${townsCollection}/${idTown}`,
                headers: authHeaders,
                data: JSON.stringify(townInfo)
            });

            getTowns(idCountry, country);
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteTown(id) {
        try {
            await $.ajax({
                method: 'DELETE',
                url: `${baseUrl}appdata/${appKey}${townsCollection}/${id}`,
                headers: authHeaders
            });
            $(`#${id}`).remove();
        } catch (e) {
            console.log(e);
        }
    }

    function sortByName(collection) {
        collection.sort(function (a, b) {
            let nameX = a.name.toLowerCase();
            let nameY = b.name.toLowerCase();
            return nameX < nameY ? -1 : nameX > nameY ? 1 : 0;
        });
    }
}