$(document).ready(function () {
    $('#mail').focus();
    $('#emailHelp').hide();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function autoFill() {
        let address = $('#mail').val();
        if (!validateEmail(address)) {
            $('#mail').css('background', 'red').focus();
            $('#emailHelp').show();
            return;
        } else {
            $('#mail').css('background', 'white');
            $('#emailHelp').hide();
        }

        let ln = address.indexOf('@'),
            message = [
                address.substr(0, address.indexOf('.')),
                address.substr(address.indexOf('.') + 1, address.indexOf('@') - address.indexOf('.') - 1),
                address.toUpperCase(),
                address
            ],
            params = {
                active: true,
                currentWindow: true
            };

        if (!message[1]) {
            message[0] = message[1] = address.substr(0, address.indexOf('@'));
        }

        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }

    $('#autofill').click(function () { autoFill(); });
    $('#mail').keypress(function(e){ if(e.which === 13){ e.preventDefault; autoFill();} });

});