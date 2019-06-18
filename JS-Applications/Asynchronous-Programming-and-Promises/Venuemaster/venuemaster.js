function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJ_Ke8hZg/';
    const username = 'guest';
    const password = 'pass';
    const authHeaders = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('#getVenues').on('click', getVenuesIdByDate);

    async function getVenuesIdByDate() {
        try {
            let $date = $('#venueDate').val();

            let ids = await $.ajax({
                method: 'POST',
                url: `${baseUrl}rpc/${appKey}custom/calendar?query=${$date}`,
                headers: authHeaders,
            });

            getVenues(ids);
        } catch (e) {
            console.log(e);
        }
    }

    function getVenues(ids) {
        $('#venue-info').empty();

        ids.forEach(async id => {
            try {
                let venue = await $.ajax({
                    method: 'GET',
                    url: `${baseUrl}appdata/${appKey}venues/${id}`,
                    headers: authHeaders
                });

                showVenues(venue);
            } catch (e) {
                console.log(e);
            }
        })
    }

    function showVenues(venue) {
        // console.log(venue);

        let $currVenueDiv = $(`
            <div class="venue" id="${venue._id}">
              <span class="venue-name">
              <input class="info" type="button" value="More info">${venue.name}</span>
              <div class="venue-details" style="display: none;">
                <table>
                  <tr>
                    <th>Ticket Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td class="venue-price">${venue.price} lv</td>
                    <td>
                      <select class="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td><input class="purchase" type="button" value="Purchase"></td>
                  </tr>
                </table>
                <span class="head">Venue description:</span>
                <p class="description">${venue.description}</p>
                <p class="description">Starting time: ${venue.startingHour}</p>
              </div>
            </div>
            `);

        $currVenueDiv.find('.info').on('click', () =>  $currVenueDiv.find('.venue-details').toggle() );
        $currVenueDiv.find('.purchase').on('click', () => {
            confirmTicketPurchase(venue._id, venue.name, venue.price);
        });

        $('#venue-info').append($currVenueDiv);
    }

    function confirmTicketPurchase(id, name, price) {
        let $qty = $(`#${id}`).find('.quantity').val();
        let $infoDiv = $('#venue-info');

        $infoDiv.empty();
        let total = Number($qty) * price;

        $confirmationTemplate = $(`
                <span class="head">Confirm purchase</span>
                <div class="purchase-info">
                  <span>${name}</span>
                  <span>${$qty} x ${price}</span>
                  <span>Total: ${total} lv</span>
                  <input type="button" value="Confirm">
                </div>
            `);

        $confirmationTemplate.find(':button').on('click', () => {
            purchaseTickets(id, name, $qty);
        });

        $infoDiv.append($confirmationTemplate);
    }

    async function purchaseTickets(id, name, qty) {
        try {
            let ticketHtml = await $.ajax({
                method: 'POST',
                url: `${baseUrl}rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty}`,
                headers: authHeaders
            });
            attachTicketHtml(ticketHtml.html);
        } catch (e) {
            console.log(e);
        }
    }

    function attachTicketHtml(html) {
        // console.log(html);
        let $venueInfoDiv = $('#venue-info');

        $venueInfoDiv.empty();
        $venueInfoDiv.append('You may print this page as your ticket');
        $venueInfoDiv.append(html);
    }
}


//"23-11", "24-11", "25-11", "26-11" and "27-11"