// chrome.webNavigation.onCommitted.addListener(updateIcon);
// chrome.webNavigation.onHistoryStateUpdated.addListener(updateIcon);
// chrome.webNavigation.onBeforeNavigate.addListener(updateIcon);

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
    else
      console.error(chrome.i18n.getMessage('inHandlerError'), e);
  });
});
//chrome.webNavigation.onCommitted.addListener(function(data) {
function updateIcon(data) {
  console.log('onHistory');
  console.log(data);
  rocknroll = localStorage.getItem('rocknroll');
  console.log(rocknroll);
  if (rocknroll == 'true') {
    chrome.browserAction.setIcon({
      path: "/icons/on.png",
      tabId: data.tabId
    });
  } else {
    chrome.browserAction.setIcon({
      path: "/icons/off.png",
      tabId: data.tabId
    });
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

var ExtensionDataName = "myfirstextensiondata";
var ExtensionData = {
  dataVersion: 3, //if you want to set a new default data, you must update "dataVersion".
  villages: []
};

chrome.storage.onChanged.addListener(function(changes, areaName) {
  console.log('storage changed');
  //"sync","local" or "managed"
  console.log(changes + ':' + areaName);
});
//default data

ExtensionData.villages.push({
  id: "1325848",
  name: "village1"
}, {
  id: "8744351",
  name: "village2"
}, {
  id: "8952187",
  name: "village3"
});
DB_save();

function DB_setValue(name, value, callback) {
  var obj = {};
  obj[name] = value;
  console.log("Data Saved!");
  chrome.storage.local.set(obj, function() {
    if (callback) callback();
  });
}

function DB_load(callback) {
  chrome.storage.local.get(ExtensionDataName, function(r) {
    if (isEmpty(r[ExtensionDataName])) {
      DB_setValue(ExtensionDataName, ExtensionData, callback);
    } else if (r[ExtensionDataName].dataVersion != ExtensionData.dataVersion) {
      DB_setValue(ExtensionDataName, ExtensionData, callback);
    } else {
      ExtensionData = r[ExtensionDataName];
      callback();
    }
  });
}

function DB_save(callback) {
  DB_setValue(ExtensionDataName, ExtensionData, function() {
    if (callback) callback();
  });
}

function DB_clear(callback) {
  chrome.storage.local.remove(ExtensionDataName, function() {
    if (callback) callback();
  });
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

DB_load(function() {
  //YOUR MAIN CODE WILL BE HERE
  console.log(ExtensionData);
  console.log(ExtensionData.villages); //array of villages
  console.log(ExtensionData.villages[0]); //first village object
  console.log(ExtensionData.villages[0].id); //first village id
  console.log(ExtensionData.villages[0].name); //first village name

  //HOW TO ITERATE VILLAGES

  for (var i = 0; i < ExtensionData.villages.length; i++) {
    console.log(ExtensionData.villages[i].id); //village id
    console.log(ExtensionData.villages[i].name); //village name
  }
});

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
