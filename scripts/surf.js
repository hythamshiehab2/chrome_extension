var myLocalData;
function TT()
{
  console.log('TT is called');
}

function RR()
{
  chrome.tabs.update(
    tabs[0].id, { url: 'http://localhost/?p=1'}, function(tab) {
    //tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
        //chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        //if (tabId === tab.id && changeInfo.status == 'complete') {
          //chrome.tabs.onUpdated.removeListener(listener);
          // Now the tab is ready!
          //chrome.tabs.sendMessage(tabs[0].id, {data: "start"});
        });
}

(function () {
  console.log('here');
    chrome.storage.onChanged.addListener(function (changes,areaName) {
        //console.log("New item in storage",changes.visitedPages.newValue);
    })
    chrome.storage.local.get("started",function(items) {
      started = localStorage.getItem('started');
      rocknroll = localStorage.getItem('rocknroll');
      console.log('started:' + started);
      if(started == 'true')
      {
        console.log('ok');
        //$('#toggleButton').prop('checked', true);
        //$('#toggleButton').click();
        $('#toggleButton').bootstrapToggle('on');
        $('#theContract').css('display', 'block');
        //$('#toggleButton').prop('checked', true);
        //$('#toggleButton').prop('enabled', true);
        //$('#toggleButton').refresh();
        //$('#toggleButton').redraw();
      }
      else {
        //$('#toggleButton').prop('checked', false).refresh();
        //$('#toggleButton').click();
        $('#toggleButton').bootstrapToggle('off');
        $('#theContract').css('display', 'none');
      }
      if(rocknroll == 'true')
      {
        $('#toggleStartNow').bootstrapToggle('on');
      }
      else {
        $('#toggleStartNow').bootstrapToggle('off');
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
      //$('#theContract').visibility = 'true';
      $('#console-event').html('Toggle: ' + $(this).prop('checked'));
      status = $(this).prop('checked');
      if(status == 'true')
      {
        localStorage.setItem('started','true');
        $('#console-event').html('will r&r!');
        $('#theContract').css('display', 'inline-block');
        TT();
      }
      else {
        localStorage.setItem('started','false');
        localStorage.setItem('rocknroll','false');
        console.log('started:false');
        $('#theContract').css('display', 'none');
      }
    });

    $('#toggleStartNow').change(function() {
      status = $(this).prop('checked');
      if(status == 'true')
      {
        chrome.browserAction.setBadgeText({"text":localStorage.length.toString()});
        console.log('rr is on');
        localStorage.setItem('rocknroll','true');
        console.log('update the icons');
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.runtime.sendMessage({
                    action: 'updateIcon',
                    value: true
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
      else {
        console.log('rr is off');
        localStorage.setItem('rocknroll','false');
      }
        chrome.extension.sendMessage({ msg: "startFunc", data: tabs[0] });
        var activeURL = tabs[0].url;
        localStorage.setItem('liked','0');
      });
})
