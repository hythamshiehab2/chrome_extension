document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      //document.getElementById("data").innerText = items.data;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('status').textContent = "Extension loaded";
    //var button = document.getElementById('startSurf');
    //var toggleButton = document.getElementById('toggleButton');
    $('#toggleButton').change(function() {
      //$('#console-event').html('Toggle: ' + $(this).prop('checked'));
      console.log('xxxxxxx');
    })
    button.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.extension.sendMessage({ msg: "startFunc", data: tabs[0] });
          chrome.tabs.update(
            //tabs[0].id, { url: 'http://localhost/?p=1'}, function(tab) {
            tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
                //chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                //if (tabId === tab.id && changeInfo.status == 'complete') {
                  //chrome.tabs.onUpdated.removeListener(listener);
                  // Now the tab is ready!
                  //chrome.tabs.sendMessage(tabs[0].id, {data: "start"});
                });
              });
            });
          });
