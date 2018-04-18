// chrome.webNavigation.onCommitted.addListener(updateIcon);
// chrome.webNavigation.onHistoryStateUpdated.addListener(updateIcon);
// chrome.webNavigation.onBeforeNavigate.addListener(updateIcon);
function RR() {
  console.log('surf:RR is called');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(
      tabs[0].id, {
        url: 'https://www.facebook.com/en7erafatamnaldawla'
      },
      function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            // Now the tab is ready!
            console.log('surf.js:tabId:' + tabId);
            chrome.tabs.sendMessage(tabId, {
              data: "startRR"
            });
          }
        });
      });
  });
}

function RRR() {
  console.log('RRRRR is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(
      tabs[0].id, {
        url: 'https://amnaldawla.wordpress.com'
      },
      function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
              data: "startRRR"
            });
          }
        });
      });
  });
}


chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    if(key == 'rocknroll')
    {
      if(storageChange.newValue == 'true')
      {
        console.log('background.js:will start rocknroll');
        RR();
      }
      else {
        console.log('background.js:will cut off rocknroll');
      }
    }
    console.log('Storage key "%s" in namespace "%s" changed. ' +
      'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue);
  }
});

var eventList = ['onBeforeNavigate', 'onCreatedNavigationTarget',
  'onCommitted', 'onCompleted', 'onDOMContentLoaded',
  'onErrorOccurred', 'onReferenceFragmentUpdated', 'onTabReplaced',
  'onHistoryStateUpdated'
];

eventList.forEach(function(e) {
  chrome.webNavigation[e].addListener(function(data) {
    if (typeof data)
      //console.log(chrome.i18n.getMessage('inHandler'), e, data);
      updateIcon(data);
    //else
    //console.error(chrome.i18n.getMessage('inHandlerError'), e);
  });
});
// chrome.runtime.onMessage.addListener(function(data) {
//   if (typeof data)
//     updateIcon(data);
// });

//chrome.webNavigation.onCommitted.addListener(function(data) {
function updateIcon(data) {
  //console.log('onHistory');
  //console.log(data);
  console.log('updateIcon');
  rocknroll = localStorage.getItem('rocknroll');
  if (rocknroll) {
    if (rocknroll == 'true') {
      // for here add more than one icon and rolling between them
      //
      var r = Math.floor(Math.random() * 6);
      //var idea = ideas[randomArrayPosition];
      chrome.browserAction.setIcon({
        path: "/icons/on" + r + ".png",
        tabId: data.tabId
      });
    } else {
      chrome.browserAction.setIcon({
        path: "/icons/off.png",
        tabId: data.tabId
      });
    }
  }
}

function checkForValidURL(tabId, info, tab) {
  //function checkForValidURL() {
  console.log('checkForValidURL is called:' + tabId + ':' + info + ':' + tab);
}

//chrome.tabs.onUpdated.addListener(checkForValidURL);
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('background.js:' + msg);
  console.log(msg);
  //zoltrix
  var data = msg.greeting || {};
  console.log(data);
  if (data == 'hello')
  {
    RRR();
  }
});

//   console.log(msg);
//   console.log(sender);
//   //console.log(tabs[0].id);
//   console.log(tab.tabId);
//   console.log(tabId);
//   console.log(tab.id);
//   console.log('x');
//   console.log(msg.action);
//   console.log(msg.value);
//   if (msg.action === "updateIcon") {
//     if (msg.value) {
//       console.log('will update the icon:' + msg.value);
//       //chrome.browserAction.setIcon({path: "/icons/on.png"});
//       chrome.browserAction.setIcon({
//         tabId: tab.id,
//         path: "/icons/on.png"
//       });
//     } else {
//       chrome.browserAction.setIcon({
//         tabId: tab.id,
//         path: "/icons/off.png"
//       });
//     }
//   }
// });

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
  console.log('listening...');
  //if (tabId === tabs[0].id && changeInfo.status == 'complete') {
  if (changeInfo.status == 'complete') {
    console.log('status complete');
    console.log(changeInfo);
    // Now the tab is ready!
    //chrome.browserAction.setIcon({path: "icons/on.png"});
    console.log('background.js:tabId:' + tabId);
    chrome.tabs.sendMessage(tabId, {
      data: "start"
    });
    // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //   console.log(response.farewell);
    // });
    //chrome.tabs.onUpdated.removeListener(listener);

  }
});
