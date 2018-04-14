var myLocalData;
document.body.onload = function() {
  //localData['started'] = off;
  chrome.storage.local.get("color",function(items) {
    console.log("get");
    console.log(items);
  });
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
      $('#console-event').html('Toggle: ' + $(this).prop('checked'));
      status = $(this).prop('checked');
      if(status == 'true')
      {
        $('#console-event').html('will r&r!');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
      }
    });
    })
