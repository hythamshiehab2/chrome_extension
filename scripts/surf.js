var myLocalData;
(function () {
  console.log('here');
    chrome.storage.onChanged.addListener(function (changes,areaName) {
        //console.log("New item in storage",changes.visitedPages.newValue);
    })
    chrome.storage.local.get("started",function(items) {
      started = localStorage.getItem('started');
      console.log('started:' + started);
      if(started == 'true')
      {
        console.log('ok');
        $('#toggleButton').prop('checked', true).change();
        //$('#toggleButton').bootstrapToggle('on');
        //$('#toggleButton').prop('checked', true);
        //$('#toggleButton').prop('enabled', true);
        //$('#toggleButton').refresh();
        //$('#toggleButton').redraw();
      }
      else {
        $('#toggleButton').bootstrapToggle('off');
        $('#theContract').css('display', 'none');
      }
    });
})();
document.body.onload = function() {
  //localData['started'] = off;
  chrome.storage.local.get(myLocalData, function(items) {
    if (!chrome.runtime.error) {
      //console.log('localData:' + myLocalData['url']);
      console.log(myLocalData.started);
      console.log(myLocalData.liked);
      console.log(items);
      console.log(items['started']);
      console.log(items.started);

      //document.getElementById("data").innerText = items.data;
    }
  });
}

chrome.storage.onChanged.addListener(function(changes,areaName) {
  console.log('storage changed');
  //"sync","local" or "managed"
  console.log(changes + ':' + areaName);
});

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('status').textContent = "Extension loaded";
    //var button = document.getElementById('startSurf');
    //var toggleButton = document.getElementById('toggleButton');
    $('#toggleButton').change(function() {
      $('#theContract').visibility = 'true';
      $('#console-event').html('Toggle: ' + $(this).prop('checked'));
      status = $(this).prop('checked');
      if(status == 'true')
      {
        $('#console-event').html('will r&r!');
        $('#theContract').css('display', 'inline-block');
      }
      else {
        localStorage.setItem('started','false');
        $('#theContract').css('display', 'none');
      }
    });

    $('#toggleStartNow').change(function() {
      var status = $(this).prop('checked');
      if(status == 'true')
      {
        console.log('update the icons');
        //chrome.tabs.sendMessage(tabId, {data: "start"});
        chrome.extension.sendMessage({
          msg: 'updateIcon',
          data: true
        });
      }
      else {

      }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.runtime.sendMessage({
          action: 'updateIcon',
          value: true
      });

        chrome.extension.sendMessage({ msg: "startFunc", data: tabs[0] });
        var activeURL = tabs[0].url;
        //myLocalData[url] = 'xxxx';
        localStorage.setItem('started','true');
        localStorage.setItem('liked','0');
        chrome.browserAction.setBadgeText({"text":localStorage.length.toString()});
        chrome.storage.local.set({"color":"red"},function() {
          console.log("set");
          //string or array of string or object keys
        });
        chrome.tabs.update(
          tabs[0].id, { url: 'http://localhost/?p=1'}, function(tab) {
          //tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
              //chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
              //if (tabId === tab.id && changeInfo.status == 'complete') {
                //chrome.tabs.onUpdated.removeListener(listener);
                // Now the tab is ready!
                //chrome.tabs.sendMessage(tabs[0].id, {data: "start"});
              });
            });
      });
})
