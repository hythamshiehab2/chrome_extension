/*
by Hytham Shiehab <hytham.shiehab.2@gmail.com>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/

function RR() {
    console.log('surf:RR is called');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.update(
            tabs[0].id, {
                url: 'https://www.facebook.com/en7erafatamnaldawla'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        // Now the tab is ready!
                        console.log('surf.js:tabId:' + tabId);
                        chrome.tabs.sendMessage(tabId, {
                            data: "doFacebookStuff"
                        }, function (response) {
                            console.log('from RR()');
                            console.log(response);
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
    }, function (tabs) {
        chrome.tabs.update(
            tabs[0].id, {
                url: 'https://amnaldawla.wordpress.com'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        // Now the tab is ready!
                        chrome.tabs.sendMessage(tabs[0].id, {
                            data: "doWordpressStuff"
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
    }, function (tabs) {
        chrome.tabs.update(
            tabs[0].id, {
                url: 'https://twitter.com/'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        // Now the tab is ready!
                        chrome.tabs.sendMessage(tabs[0].id, {
                            data: "doTwitterStuff"
                        }, function (response) {
                            console.log('from Twitter()');
                            console.log(response);
                        });
                    }
                });
            });
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    //updateIcon();
    for (key in changes) {
        var storageChange = changes[key];
        if (key == 'rocknroll') {
            if (storageChange.newValue == 'true') {
                console.log('background.js:will start rocknroll');
                //RR();
                Twitter();
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

eventList.forEach(function (e) {
    chrome.webNavigation[e].addListener(function (data) {
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
        } else {
            chrome.browserAction.setIcon({
                path: "/icons/off.png",
                tabId: data.tabId
            });
        }
    }
    tabId = localStorage.getItem('tabId') || false;
    if (!tabId) {
        localStorage.setItem('tabId', data.tabId);
        chrome.storage.local.set({
            'tabId': data.tabId
        }, function () {
            // Notify that we saved.
            console.log('surf:Settings saved');
        });
    }
}

// function checkForValidURL(tabId, info, tab) {
//   console.log('checkForValidURL is called:' + tabId + ':' + info + ':' + tab);
// }

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('background.js:' + msg);
    console.log(msg);
    var data = msg.data || {};
    console.log(data);
    //    if (data === 'doWordpressStuff') {
    //        console.log('WILL DO: doWordpressStuff');
    //        RRR();
    //    }
    if (data === 'doTwitterStuff_DONE') {
        sendResponse('doTwitterStuff_DONE:CONFIRMED');
        //console.log('WILL DO: doTwitterStuff');
        //Twitter();
        console.log('Twitter STUFF IS DONE!');
        //console.log('what should I do now!?');
        //        chrome.runtime.sendMessage({
        //            data: "doTwitterStuff_DONE"
        //        }, function (response) {
        //            console.log(response);
        //        });
        //        chrome.tabs.sendMessage(tabs[0].id, {
        //            data: "doTwitterStuff"
        //        }, function (response) {
        //            console.log('from Twitter()');
        //            console.log(response);
        //        });
        //theHypered();
    }
});

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
    console.log('listening...');
    //if (tabId === tabs[0].id && changeInfo.status == 'complete') {
    console.log(changeInfo.status);
    if (changeInfo.status == 'complete') {
        console.log('status complete');
        console.log(changeInfo);
        // Now the tab is ready!
        console.log('background.js:tabId:' + tabId);
        //        chrome.tabs.sendMessage(tabId, {
        //            data: "start"
        //        });
    }
});
