var myLocalData;

function TT() {
  console.log('TT is called');
}

function callback() {
  console.log('callback is called');
}

function startRR() {
  //   RR(function() {
  //     RRR();
  //   }
  // });
  //RR();
  //RRR();
  $.when(RR()).done(function() {
    RRR();
  });
  // RR(function(callback) {
  //   callback();
  // });
  // RRR(function(callback) {
  //   callback();
  // });
  //RR().then(RRR());
}

function RRR() {
  console.log('RRRRRRRR is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // chrome.runtime.sendMessage({
    //   action: 'updateIcon',
    //   value: true,
    //   data: 'xxx'
    // });
    chrome.tabs.update(
      tabs[0].id, {
        //url: 'http://localhost/?p=1'
        url: 'https://amnaldawla.wordpress.com'
      },
      function(tab) {
        //tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            //chrome.tabs.onUpdated.removeListener(listener);
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
              data: "startRRR"
            });
            // chrome.browserAction.setIcon({
            //   path: "/icons/icon4.png",
            //   tabId: tab.tabId
            // });
          }
        });
      });
  });
}

function RR() {
  console.log('RR is called');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // chrome.runtime.sendMessage({
    //   action: 'updateIcon',
    //   value: true,
    //   data: 'xxx'
    // });
    chrome.tabs.update(
      tabs[0].id, {
        //url: 'http://localhost/?p=1'
        url: 'https://www.facebook.com/en7erafatamnaldawla'
      },
      function(tab) {
        //tabs[0].id, { url: 'https://www.facebook.com/en7erafatamnaldawla'}, function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            //chrome.tabs.onUpdated.removeListener(listener);
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
              data: "startRR"
            });
            // chrome.browserAction.setIcon({
            //   path: "/icons/icon4.png",
            //   tabId: tab.tabId
            // });
            console.log('rr is on');
          }
        });
      });
  });
}

(function() {
  console.log('here');
  started = localStorage.getItem('started');
  rocknroll = localStorage.getItem('rocknroll');
  console.log('started:' + started);
  if (started == 'true') {
    $('#toggleButton').bootstrapToggle('on');
    $('#theContract').css('display', 'block');
  } else {
    $('#toggleButton').bootstrapToggle('off');
    $('#theContract').css('display', 'none');
  }
  if (rocknroll == 'true') {
    $('#toggleStartNow').bootstrapToggle('on');
  } else {
    $('#toggleStartNow').bootstrapToggle('off');
  }
})();

window.onload = function() {
  console.log('window is loaded');
  var rr = 0;
  rr = localStorage.getItem('rocknroll');
  console.log('rr:' + rr);
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    console.log('storage changed');
    console.log(changes + ':' + areaName);
  });
}

$('#toggleButton').change(function() {
  $('#console-event').html('Toggle: ' + $(this).prop('checked'));
  status = $(this).prop('checked');
  if (status == 'true') {
    localStorage.setItem('started', 'true');
    chrome.storage.local.set({
      'started': 'true'
    }, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
    $('#console-event').html('will r&r!');
    $('#theContract').css('display', 'block');
    //TT();
  } else {
    localStorage.setItem('started', 'false');
    localStorage.setItem('rocknroll', 'false');
    chrome.storage.local.set({
      'started': 'false',
      'rocknroll': 'false'
    }, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
    console.log('started:false');
    $('#theContract').css('display', 'none');
  }
});

$('#toggleStartNow').change(function() {
  status = $(this).prop('checked');
  if (status == 'true') {
    chrome.browserAction.setBadgeText({
      "text": localStorage.length.toString()
    });
    //chrome.browserAction.setIcon({path: 'icons/on.png'});
    //chrome.browserAction.setIcon({path: '/icons/on.png'});
    localStorage.setItem('rocknroll', 'true');
    chrome.storage.local.set({
      'rocknroll': 'true'
    }, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
    console.log('update the icons');
    startRR();
    //RRR();
  } else {
    console.log('rr is off');
    localStorage.setItem('rocknroll', 'false');
    chrome.storage.local.set({
      'rocknroll': 'false'
    }, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
  }
  // chrome.extension.sendMessage({
  //   msg: "startFunc",
  //   data: tabs[0]
  // });
  //var activeURL = tabs[0].url;
  localStorage.setItem('liked', '0');
  chrome.storage.local.set({
    'liked': '0'
  }, function() {
    // Notify that we saved.
    console.log('Settings saved');
  });
});
