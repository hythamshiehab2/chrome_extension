/* CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES */

var EXTENSION_ID = 'mpnhfhekacdacnjkegjdmfgjfkckacea';

chrome.runtime.onInstalled.addListener(function() {
  //Replace all rules
  localStorage.setItem('tabId', 0);
  localStorage.setItem('started', 'false');
  localStorage.setItem('rocknroll', 'false');
  localStorage.setItem('liked', 'false');
});


function rollTheDice(t) {
  var l = 0;
  //var t = passMessageCheck();
  var t = 0;
  //chrome.runtime.sendMessage(EXTENSION_ID, {
  chrome.runtime.sendMessage({
    data: "CHECK_MSG_FLOW"
  }, function(response) {
    console.log('RESP:CHECK_MSG_FLOW');
    console.log(response);
    t = 0 || response;
  });
  //firstFunction( () => console.log('huzzah, I\'m done!') )
  // chrome.tabs.query({
  //   active: true,
  //   currentWindow: true
  // }, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {
  //     data: "CHECK_MSG_FLOW"
  //   }, function(response) {
  //     console.log('RESP:CHECK_MSG_FLOW');
  //     console.log(response);
  //     l = response;
  //   });
  // });

  console.log('l:' + l);
  var r = t || Math.floor(Math.random() * 3) + 1;
  console.log('Dice:' + r);
  //r = 3;
  if (r === 1000) {
    startIgnition();
  }

  if (r === 1) {
    Facebook();
  }
  if (r === 2) {
    Wordpress();
  }
  if (r === 3) {
    Twitter();
  }
}

function startIgnition() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(tabs[0].id, {
      url: '/starter.html'
    }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        var a = chrome.extension.getURL("css/myactivetab.css");
        if (tabId === tab.id && changeInfo.status == 'complete') {
          chrome.tabs.insertCSS({
            //file: a
            code: "#elmotasha3eb {position: fixed;width: 100%;height: 100%;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;}"
          });
          var javascriptCode = "var divElement = document.createElement('div');";
          javascriptCode += "divElement.id = 'elmotasha3eb';";
          javascriptCode += "document.body.appendChild(divElement);";
          chrome.tabs.executeScript({
            //file: a
            code: javascriptCode
          });
          // Now the tab is ready!
          chrome.tabs.sendMessage(tabId, {
            data: "startIgnition"
          }, function(response) {
            console.log('from startIgnition()');
            console.log(response);
          });
        }
      });
    });
  });
}

function Facebook() {
  tab_id = localStorage.getItem('tabId');
  tab_id = parseInt(tab_id);
  console.log('surf:Facebook is called');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    myTabID = tab_id || tabs[0].id;
    chrome.tabs.update(
    //tabs[0].id, {
    //tab_id, {
    myTabID, {
      url: 'https://www.facebook.com/en7erafatamnaldawla'
    }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status == 'complete') {
          // Now the tab is ready!
          console.log('surf.js:tabId:' + tabId);
          chrome.tabs.sendMessage(tabId, {
            data: "doFacebookStuff"
          }, function(response) {
            console.log('from Facebook()');
            console.log(response);
          });
        }
      });
    });
  });
}

function Wordpress() {
  tab_id = localStorage.getItem('tabId');
  tab_id = parseInt(tab_id);
  console.log('Wordpress is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    myTabID = tab_id || tabs[0].id;
    chrome.tabs.update(
    //tabs[0].id, {
    //tab_id, {
    myTabID, {
      //tabs[0].id, {
      //tab_id, {
      url: 'https://amnaldawla.wordpress.com'
    }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status == 'complete') {
          // Now the tab is ready!
          chrome.tabs.sendMessage(tabId, {
            data: "doWordpressStuff"
          }, function(response) {
            console.log('from Wordpress()');
            console.log(response);
          });
        }
      });
    });
  });
}

function Twitter() {
  tab_id = localStorage.getItem('tabId');
  tab_id = parseInt(tab_id);
  console.log('Twitter is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    myTabID = tab_id || tabs[0].id;
    chrome.tabs.update(
    //tabs[0].id, {
    //tab_id, {
    myTabID, {
      //tab_id, {
      url: 'https://twitter.com/'
    }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status == 'complete') {
          // Now the tab is ready!
          chrome.tabs.sendMessage(tabId, {
            data: "doTwitterStuff"
          }, function(response) {
            console.log('from Twitter()');
            console.log(response);
          });
        }
      });
    });
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  //updateIcon();
  for (key in changes) {
    var storageChange = changes[key];
    if (key == 'rocknroll') {
      if (storageChange.newValue == 'true') {
        console.log('background.js:will start rocknroll');
        //startIgnition();
        //rollTheDice(1000);
      } else {
        console.log('background.js:will cut off rocknroll');
      }
    }
    console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
  }
});

var eventList = [
  'onBeforeNavigate',
  'onCreatedNavigationTarget',
  'onCommitted',
  'onCompleted',
  'onDOMContentLoaded',
  'onErrorOccurred',
  'onReferenceFragmentUpdated',
  'onTabReplaced',
  'onHistoryStateUpdated'
];

eventList.forEach(function(e) {
  chrome.webNavigation[e].addListener(function(data) {
    if (typeof data)
      //console.log(chrome.i18n.getMessage('inHandler'), e, data);
      updateIcon(data);
      //else
      //console.error(chrome.i18n.getMessage('inHandlerError'), e);
    }
  );
});

function updateIcon(data) {
  //console.log('updateIcon');
  rocknroll = localStorage.getItem('rocknroll');
  if (rocknroll) {
    if (rocknroll == 'true') {
      // for here add more than one icon and rolling between them
      //
      var r = Math.floor(Math.random() * 6);
      chrome.browserAction.setIcon({
        path: "/icons/on" + r + ".png",
        tabId: data.tabId
      });
      tabId = localStorage.getItem('tabId') || 0;
      if (!tabId) {
        localStorage.setItem('tabId', data.tabId);
        console.log('setting tabId');
        chrome.storage.local.set({
          'tabId': data.tabId
        }, function() {
          // Notify that we saved.
          console.log('surf:Settings saved');
        });
      }
    } else {
      chrome.browserAction.setIcon({path: "/icons/off.png", tabId: data.tabId});
    }
  }
}

// function checkForValidURL(tabId, info, tab) {
//   console.log('checkForValidURL is called:' + tabId + ':' + info + ':' + tab);
// }

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('background.js:' + msg);
  console.log(msg);
  var data = msg.data || {};
  console.log(data);

  // if data match CHECK_MSG_FLOW_RESPONSE:<NUMBER>
  // get the <NUMBER> and evaluate rulling the dice OR should wait for the current process to finished
  // ZOLTRIX
  //if (data === )
  if (data === 'doTwitterStuff_DONE') {
    sendResponse('doTwitterStuff_DONE:CONFIRMED');
    console.log('Twitter STUFF IS DONE!');
    //rollTheDice();
    console.log('will rollTheDice in 30s');
    setTimeout(rollTheDice, 30000);
  }
  if (data === 'doFacebookStuff_DONE') {
    sendResponse('doFacebookStuff_DONE:CONFIRMED');
    console.log('Facebook STUFF IS DONE!');
    //rollTheDice();
    console.log('will rollTheDice in 30s');
    setTimeout(rollTheDice, 30000);
  }
  if (data === 'doWordpressStuff_DONE') {
    sendResponse('doWordpressStuff_DONE:CONFIRMED');
    console.log('Wordpress STUFF IS DONE!');
    //rollTheDice();
    console.log('will rollTheDice in 30s');
    setTimeout(rollTheDice, 30000);
  }

  if (data === 'surfStartIgnition') {
    console.log('surfStartIgnition:CONFIRMED')
    sendResponse('surfStartIgnition_DONE');
    rollTheDice();
    //console.log('Wordpress STUFF IS DONE!');
  }

});

//chrome.tabs.onUpdated.addListener(function(msg, sender, sendResponse) {
//chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('listening...');
  //if (tabId === tabs[0].id && changeInfo.status == 'complete') {
  console.log(changeInfo.status);
  if (changeInfo.status == 'complete') {
    console.log('status complete');
    // Now the tab is ready!
    console.log('background.js:tabId:' + tabId);
    tabId2 = localStorage.getItem('tabId');
    if (tabId != tabId2)
      localStorage.setItem('tabId', tabId);
    console.log('setting tabId');
    chrome.storage.local.set({
      'tabId': tabId
    }, function() {
      // Notify that we saved.
      console.log('surf:Settings saved');
    });
  }
});
