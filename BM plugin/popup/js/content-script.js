chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.info(
        'fname :', message[0],
        'lname :', message[1],
        'username :', message[2],
        'email :', message[3]
    );
    let inputs = $(".t-Body-contentInner :input[type=text]")
    i = 0;
    for (input of inputs) {
        input.value = message[i];
        i++;
    }
});

