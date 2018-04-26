/*
CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/
var isFBisLiked = false;
var msgFlow = [];
var msgPipe = ['doTwitterStuff', 'doFacebookStuff', 'doWordpressStuff'];

chrome.runtime.onInstalled.addListener(function() {
  //Replace all rules
  localStorage.setItem('tabId', 0);
  localStorage.setItem('started', 'false');
  localStorage.setItem('rocknroll', 'false');
  localStorage.setItem('liked', 'false');
});

function checkMessageFlow() {
  // this will keep track of the flow of the procedures, acting as the officer of Elmoror
  // Till now, I have no IDEA how!
  //
  console.log('checkMessageFlow');
  var msg = msgFlow.shift() || false;
  console.log('msg:' + msg);
  var willGoTo = msg;
  if (!willGoTo) {
    var randomArrayPosition = Math.floor(Math.random() * msgPipe.length);
    willGoTo = msgPipe[randomArrayPosition];
  }
  console.log('willGoTo:' + willGoTo);
  if (willGoTo === 'doTwitterStuff') {
    T_tweet();
  }
  if (willGoTo === 'doFacebookStuff') {
    FB_share_like();
  }
  if (willGoTo === 'doWordpressStuff') {
    ShareSomething();
  }
}

function theHypered() {
  var ctx = 0;
  console.log('theHypered is checking...');
  chrome.storage.local.get(['rocknroll'], function(result) {
    console.log('content:my rocknroll is ' + result.rocknroll);
    ctx = result.rocknroll;
    if (ctx == 'true') {
      console.log('theHypered will execute.');
      checkMessageFlow();
    } else {
      console.log('theHypered is exiting...');
    }
  });
  //setTimeout(theHypered, 30000);
}

function rollTheDice() {
  var r = Math.floor(Math.random() * 3) + 1;
  console.log('Dice:' + r);
  r = 3;
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
  console.log('startIgnition()');
  chrome.tabs.create({
      url: '/starter.html',
    },
    function(tab) {
      //function(integer tabId, object changeInfo, Tab tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
        if (tabId === tab.id && changeInfo.status == 'complete') {
          // Now the tab is ready!
          chrome.tabs.sendMessage(tabId, {
            data: "startIgnition"
          }, function(response) {
            console.log('from startIgnition()');
            console.log(response);
          });
        }
        // chrome.tabs.executeScript(tabId, {
        //   code: 'document.querySelector(\'link[rel*="icon"]\').href = "//icons/icon3.png"'
        // });
        // chrome.tabs.executeScript(tabId, {
        //   code: 'document.title="الناموسية - لوحة التحكم"'
        // });
        // chrome.tabs.update(
        //   tab.id, {
        //     title: 'howier ekrwo ',
        //     pinned: true
        //   },
        // );
        tab.favIconUrl = "/icons/icon4.png";
        tab.title = "الناموسية - لوحة التحكم";
        tab.pinned = true;
      });
    });
}

function Facebook() {
  console.log('surf:Facebook is called');
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
  console.log('Wordpress is callled ');
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
  console.log('Twitter is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(
      tabs[0].id, {
        url: 'https://twitter.com/'
      },
      function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
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
        startIgnition();
      } else {
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
      chrome.browserAction.setIcon({
        path: "/icons/off.png",
        tabId: data.tabId
      });
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
  if (data === 'doTwitterStuff_DONE') {
    sendResponse('doTwitterStuff_DONE:CONFIRMED');
    console.log('Twitter STUFF IS DONE!');
  }
  if (data === 'doFacebookStuff_DONE') {
    sendResponse('doFacebookStuff_DONE:CONFIRMED');
    console.log('Facebook STUFF IS DONE!');
  }
  if (data === 'doWordpressStuff_DONE') {
    sendResponse('doWordpressStuff_DONE:CONFIRMED');
    console.log('Wordpress STUFF IS DONE!');
  }

  if (data === 'surfStartIgnition') {
    console.log('surfStartIgnition:CONFIRMED')
    sendResponse('surfStartIgnition_DONE');
    startIgnition();
    //rollTheDice();
    //console.log('Wordpress STUFF IS DONE!');
  }
  if (data === 'surfStartIgnition_DONE') {
    console.log('surfStartIgnition_DONE:CONFIRMED');
    sendResponse('surfStartIgnition_DONE:CONFIRMED');
    //startIgnition();
    //console.log('Wordpress STUFF IS DONE!');
  }
});

// chrome.tabs.onUpdated.addListener(function(msg, sender, sendResponse) {
// });

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
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
