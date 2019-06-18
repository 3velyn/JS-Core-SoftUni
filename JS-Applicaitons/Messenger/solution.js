function attachEvents() {
    const url = `https://messenger-7f3f9.firebaseio.com/messenger.json`;

    $('#submit').on('click', submitMessage);
    $('#refresh').on('click', refreshMessages);

    function submitMessage() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();

        let message = { author, content, timestamp };

        $.ajax({
            method: 'POST',
            url,
            data: JSON.stringify(message),
            success: (mess) => {console.log(mess);}
        })
    }

    function refreshMessages() {
        
        $.ajax({
            method: 'GET',
            url,
            success: loadMessages
        })
    }

    function loadMessages(data) {
        let log = '';
        for (const meesage of Object.values(data)) {
            log += `${meesage.author}: ${meesage.content}\n`;
        }
        $('#messages').text(log);
    }
}
