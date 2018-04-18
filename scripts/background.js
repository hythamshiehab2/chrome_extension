// chrome.webNavigation.onCommitted.addListener(updateIcon);
// chrome.webNavigation.onHistoryStateUpdated.addListener(updateIcon);
// chrome.webNavigation.onBeforeNavigate.addListener(updateIcon);
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
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
chrome.runtime.onMessage.addListener(function(data) {
  if (typeof data)
  {
    console.log(data);
    updateIcon(data);
  }
});
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
//chrome.webNavigation.onBeforeNavigate.addListener(onIcon);
//
// chrome.webNavigation.onCommitted.addListener(offIcon);
// chrome.webNavigation.onHistoryStateUpdated.addListener(offIcon);
// chrome.webNavigation.onBeforeNavigate.addListener(offIcon);

function onIcon(details) {
  if (details.frameId != 0) {
    return; // only update the icon for main page, not iframe/frame
  }

  console.log('updateIcon:' + details.tabId);
  //console.log(details.msg);
  console.log(details);
  //console.log(details.data.action);
  //console.log(details.data.value);
  chrome.browserAction.setIcon({
    path: "/icons/on.png",
    tabId: details.tabId
  });
}

function offIcon(details) {
  // if (details.frameId != 0) {
  //     return; // only update the icon for main page, not iframe/frame
  // }
  console.log('updateIcon:' + details.tabId);
  //console.log(details.msg);
  console.log(details);
  //console.log(details.data.action);
  //console.log(details.data.value);
  chrome.browserAction.setIcon({
    path: "/icons/off.png",
    tabId: details.tabId
  });
}

function checkForValidURL(tabId, info, tab) {
  //function checkForValidURL() {
  console.log('checkForValidURL is called:' + tabId + ':' + info + ':' + tab);
}
//chrome.tabs.onUpdated.addListener(checkForValidURL);
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log(msg);
  console.log(sender);
  //console.log(tabs[0].id);
  console.log(tab.tabId);
  console.log(tabId);
  console.log(tab.id);
  console.log('x');
  console.log(msg.action);
  console.log(msg.value);
  if (msg.action === "updateIcon") {
    if (msg.value) {
      console.log('will update the icon:' + msg.value);
      //chrome.browserAction.setIcon({path: "/icons/on.png"});
      chrome.browserAction.setIcon({
        tabId: tab.id,
        path: "/icons/on.png"
      });
    } else {
      chrome.browserAction.setIcon({
        tabId: tab.id,
        path: "/icons/off.png"
      });
    }
  }
});

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
  console.log('listening...');
  //if (tabId === tabs[0].id && changeInfo.status == 'complete') {
  if (changeInfo.status == 'complete') {
    console.log('status complete');
    //chrome.tabs.onUpdated.removeListener(listener);
    // Now the tab is ready!
    //chrome.browserAction.setIcon({path: "icons/on.png"});
    chrome.tabs.sendMessage(tabId, {
      data: "start"
    });
  }
});
