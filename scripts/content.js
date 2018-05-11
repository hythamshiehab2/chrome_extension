/*
chrome.devtools.network.onNavigated.addListener(function (url) {
    console.log('Navigation to ' + url + ' completed');
});
*/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    console.log(
        sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request);
    console.log('content.js:' + data);

    if (data === 'doMaharaStuff_REQ') {
        var responseObject = {
            message: "doMaharaStuff_REQ:CONFIRMED",
        };
        sendResponse(responseObject);
    }

    if (data === 'doTwitterStuff_REQ') {
        console.log('doTwitterStuff_REQ RECIEVED');
        console.log('SENDING CONFIRMATION')
        var responseObject = {
            message: "doTwitterStuff_REQ:CONFIRMED",
        };
        sendResponse(responseObject);
    }
});
