function doItNow() {
    chrome.runtime.sendMessage({
        data: "doItNow_REQUEST"
    }, function (response) {});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    console.log(
        sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request);
    console.log('content.js:' + data);
});
