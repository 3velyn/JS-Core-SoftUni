function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJfEPVtdV/';
    const appdata = 'contacts';
    const authToken = 'b55bb95e-0eca-4fac-aa44-b4e13bacc29d.BUQSJKFS/i+ecs/AwsfXOqovyzrv7VIw8oo+HjMC4xE=';
    const authHeaders = {
        'Authorization': `Kinvey ${authToken}`,
        'Content-Type': 'application/json'
    };

    $('#btnLoad').on('click', loadPhonebook);
    $('#btnCreate').on('click', createContact);

    function loadPhonebook() {
        $.ajax({
            method: 'GET',
            url: `${baseUrl}appdata/${appKey}${appdata}`,
            headers: authHeaders,
            success: showContacts
        })
    }

    function showContacts(contacts) {
        let $ul = $('#phonebook');
        $ul.empty();

        for (const contact of contacts) {
            let $li = $('<li>' + `${contact.person}: ${contact.phone}` + '</li>');
            let $btnDelete = $('<button>Delete</button>');

            $li.append($btnDelete);
            $btnDelete.on('click', () => {
                $.ajax({
                    method: 'DELETE',
                    url: `${baseUrl}appdata/${appKey}${appdata}/${contact._id}`,
                    headers: authHeaders,
                    success: () => $li.remove()
                })
            });
            $ul.append($li);
        }
    }

    function createContact() {
        let $person = $('#person');
        let $phone = $('#phone');
        let contact = {
            'person': $person.val(),
            'phone': $phone.val()
        };

        $.ajax({
            url: `${baseUrl}appdata/${appKey}${appdata}`,
            method: 'POST',
            headers: authHeaders,
            data: JSON.stringify(contact),
            success: () => {
                $person.val('');
                $phone.val('');
                loadPhonebook();
            }
        });
    }
}