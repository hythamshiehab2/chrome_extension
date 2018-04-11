document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').textContent = "Extension loaded";
    var button = document.getElementById('startSurf');
    button.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.update(
            //tabs[0].id, { url: 'http://localhost/?p=1'}, function(tab) {
            tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status == 'complete') {
                  chrome.tabs.onUpdated.removeListener(listener);
                  // Now the tab is ready!
                  chrome.tabs.sendMessage(tabs[0].id, {data: "start"});
                }
              });
            });
});
});
});

$(function(){
    //default value is "start"
    console.log('here');
    var currentState = localStorage.currentState || "start";
    //cache button DOM element reference
    var $toggleBtn = $("#toggle-btn");

    //update button status
    if(currentState==="stop"){
        $toggleBtn.text("OFF");
    }

    //register button click handler
    $toggleBtn.click(function(){
        if(currentState==="start"){
            $toggleBtn.text("OFF");
            localStorage.currentState="stop";
        }
        if(currentState==="stop"){
            $toggleBtn.text("ON");
            localStorage.currentState="start";
        }
    });
});
            /*
            chrome.tabs.update(tabs[0].id, {url: 'http://localhost/?p=1'}, function(response){
                  //chrome.tabs.sendMessage(response);
                  ttt = response;
                  document.DOMContentRendered(alert('boo'));
                  var t = document.querySelectorAll('textarea')[0];
                  t.innerText ='sdfsdf';

                  chrome.tabs.sendMessage(tabs[0].id, {data: "start"}, function(response) {
                      //chrome.tabs.sendMessage
                      $('#status').html('changed data in page');
                      console.log(response);
                  });
                  console.log('res:' + response);
              });            //chrome.tabs.executeScript(tab.id, {code: "alert('boo');")});
            //document.addEventListener('DOMContentLoaded', function() {
              //chrome.tabs.executeScript(tabs[0].id, {code: "document.addEventListener('DOMContentLoaded', function() {alert('test');});"}, function(response) {});
          //});
            });
          });
        });
//});

chrome.tabs.query({'active': true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: 'http://localhost/'});
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id, {code: "alert('test');"}, function(response) {
      });
  });
});
*/
