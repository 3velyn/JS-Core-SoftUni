function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_H1n8lepuV/';
    const collection = 'biggestCatches';
    const username = 'eff';
    const password = '987456';
    const authHeaders = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('.add').on('click', addCatch);
    $('.load').on('click', loadCatches);

    async function loadCatches() {
        try {
            let $catchesDiv = $('#catches');
            $catchesDiv.empty();
            let catches = await $.get({
                url: `${baseUrl}appdata/${appKey}${collection}`,
                headers: authHeaders,
            });

            for (const catchInfo of catches) {
                let $div = $(`
            <div class="catch" data-id="${catchInfo._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${catchInfo.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${catchInfo.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${catchInfo.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${catchInfo.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${catchInfo.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchInfo.captureTime}"/>
            </div>
            `);
                let $updateBtn = $(`<button class="update">Update</button>`);
                let $deleteBtn = $(`<button class="delete">Delete</button>`);

                $updateBtn.on('click', updateCatch);
                $deleteBtn.on('click', deleteCatch);

                $div.append($updateBtn);
                $div.append($deleteBtn);
                $catchesDiv.append($div);
            }
        } catch (e) {
            console.log(e);
        }

    }

    async function updateCatch() {
        console.log('updating...');
        let $catchId = $(this).parent().data('id');
        let angler = $(this).parent().find('.angler').val();
        let weight = $(this).parent().find('.weight').val();
        let species = $(this).parent().find('.species').val();
        let location = $(this).parent().find('.location').val();
        let bait = $(this).parent().find('.bait').val();
        let captureTime = $(this).parent().find('.captureTime').val();
        let modifiedCatch = {angler, weight, species, location, bait, captureTime};

        await $.ajax({
            method: 'PUT',
            url: `${baseUrl}appdata/${appKey}${collection}/${$catchId}`,
            headers: authHeaders,
            data: JSON.stringify(modifiedCatch),
        });
        loadCatches();
    }

    async function deleteCatch() {
        console.log('delete???');
        let $catchId = $(this).parent().data('id');
        await $.ajax({
            method: 'DELETE',
            url: `${baseUrl}appdata/${appKey}${collection}/${$catchId}`,
            headers: authHeaders,
        });
        loadCatches();
    }

    async function addCatch() {
        try {
            let $angler = $('#addForm .angler');
            let $weight = $('#addForm .weight');
            let $species = $('#addForm .species');
            let $location = $('#addForm .location');
            let $bait = $('#addForm .bait');
            let $captureTime = $('#addForm .captureTime');

            let catchObj = {
                angler: $angler.val(),
                weight: Number($weight.val()),
                species: $species.val(),
                location: $location.val(),
                bait: $bait.val(),
                captureTime: Number($captureTime.val())
            };

            await $.post({
                url: `${baseUrl}appdata/${appKey}${collection}`,
                headers: authHeaders,
                data: JSON.stringify(catchObj),
                success: () => {
                    $angler.val('');
                    $weight.val('');
                    $species.val('');
                    $location.val('');
                    $bait.val('');
                    $captureTime.val('');
                }
            });
            loadCatches();
        } catch (e) {
            console.log(e);
        }
    }
}