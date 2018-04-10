chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("xxxx happening from the extension");
    var data = request.data || {};
    console.log('data sent:' + data);
    console.log('wainting load to complete');
    console.log(request);
    console.log(sendResponse);
    console.log('xxxx');
    sendResponse({data: data, success: true});
    document.addEventListener('DOMContentLoaded', function() {
      var linksList = document.querySelectorAll('textarea');
      [].forEach.call(linksList, function(header) {
          header.innerHTML = request.data;
      });
      sendResponse({data: data, success: true});
    });
});
