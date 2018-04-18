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
