/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    console.log(
        sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request);
    console.log('content.js:' + data);
});
*/
