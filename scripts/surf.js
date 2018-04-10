document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').textContent = "Extension loaded";
    var button = document.getElementById('startSurf');
    button.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: 'http://localhost/?p=1'}, function(response){
                  //chrome.tabs.sendMessage(response);
                  chrome.tabs.sendMessage(tabs[0].id, {data: "start"}, function(response) {
                      //chrome.tabs.sendMessage
                      $('#status').html('changed data in page');
                      console.log('success');
                  });
              });            //chrome.tabs.executeScript(tab.id, {code: "alert('boo');")});
            //document.addEventListener('DOMContentLoaded', function() {
              //chrome.tabs.executeScript(tabs[0].id, {code: "document.addEventListener('DOMContentLoaded', function() {alert('test');});"}, function(response) {});
          //});
            });
          });
        });
//});
/*
chrome.tabs.query({'active': true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: 'http://localhost/'});
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id, {code: "alert('test');"}, function(response) {
      });
  });
});
*/
