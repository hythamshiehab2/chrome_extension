/* CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES */

// alarms
"use strict";
var count = 0;
var alarmName = "test";
var alarmInfo = {
    when: Date.now() + 6000,
    periodInMinutes: 1 //Repeatedly fire after every 1 minute
};

// notifications
var myNotificationId = null;
var opt = {
    //type: "basic",
    //notificationId: "start",
    type: "basic",
    title: "تنبيه",
    message: "لم تقم بتسجيل الدّخول على تويتر",
    iconUrl: "icons/on1.png",
    buttons: [
        {
            title: "نعم",
            iconUrl: "icons/on4.png"
    }, {
            title: "لا",
            iconUrl: "icons/on2.png"
    }
  ]
}

/* for the moment
chrome.notifications.create("", opt, function (id) {
    myNotificationId = id;
});
*/


var ports = [];
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name !== "devtools") return;
    ports.push(port);
    // Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function () {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    port.onMessage.addListener(function (msg) {
        // Received message from devtools. Do something:
        console.log('Received message from devtools page', msg);
    });
});
// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    ports.forEach(function (port) {
        port.postMessage(msg);
    });
}
chrome.notifications.onButtonClicked.addListener(function (nId, btnIdx) {
    alert('yes!' + nId + ":" + btnIdx);
});
//chrome.alarms.clearAll();
// alarms
// chrome.alarms.create(alarmName,alarmInfo);
//
// chrome.alarms.onAlarm.addListener(function(alarm) {
//   console.log("onAlarm-" + ++count);
//   alert('boo!');
// });

chrome.runtime.onStartup.addListener(function () {
    // Tell your app what to launch and how.
    localStorage.setItem('tabId', 0);
    localStorage.setItem('started', 'false');
    localStorage.setItem('rocknroll', 'false');
    localStorage.setItem('liked', 'false');
    localStorage.setItem('sessionRounds', 0);
});

var localhost = 0;
var twitter = 0;
var localhostTestNet = 0;
var mahara = 0;
var tabs = null;
//var tab_id = localStorage.getItem('tabId');
var tab_id = 0;

chrome.runtime.onInstalled.addListener(function () {
    //Replace all rules
    localStorage.setItem('tabId', 0);
    localStorage.setItem('started', 'false');
    localStorage.setItem('rocknroll', 'false');
    localStorage.setItem('liked', 'false');
    localStorage.setItem('sessionRounds', '0');
});


function nextRunSchedule() {
    var r = Math.floor(Math.random() * 20) + 10;
    r *= 1000 * 60;
    //var r = 600000;
    setTimeout(rollTheDice, r);
    return r;
}

function startEngine() {
    tab_id = parseInt(localStorage.getItem('tabId'));
    if (tab_id) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            //            alert('tabs[0].id:' + tabs[0].id);
            //            alert('tab_id:' + tab_id);
            if (tabs[0].id == tab_id) {
                // then no need to create a new tab
                console.log('MATCHED');
                //alert('matched!');
                matched = true;
            }
            chrome.tabs.sendMessage(tabs[0].id, {
                data: "CHECK_MSG_FLOW"
            }, function (response) {
                console.log('RESPONSE:CHECK_MSG_FLOW');
                console.log(response);
            });
        });
    }

    //if(matched)
    //    return;

    var createProperties = {
        url: "/starter.html",
        active: true,
        index: 0,
        pinned: true
    };
    var updateProperties = {
        //pinned : true
    };

    chrome.tabs.create(createProperties, function (tab) {
        console.log("create");
        tab_id = tab.id;
        console.log('tab_id:' + tab_id);
        chrome.tabs.update(tab.id, updateProperties, function (tab) {
            console.log("update");
            localStorage.setItem('tabId', tab_id);
            //chrome.tabs.reload(tab.id);
            chrome.tabs.getZoom(tab.id, function (zoomFactor) {
                console.log("getZoom");
                console.log(zoomFactor); //1
            });
            //chrome.tabs.sendMessage(tabs[0].id, {
            chrome.tabs.sendMessage(tab.id, {
                data: "CHECK_MSG_FLOW"
            }, function (response) {
                console.log('RESPONSE:CHECK_MSG_FLOW');
                console.log(response);
                var l = response;
            });
            /*
            chrome.tabs.setZoom(tab.id,0.92,function() {
                console.log("setZoom");
            });
            */
        });
    });
}


function rollTheDice(t) {
    twitter = 0;
    localhost = 0;
    localhostTestNet = 0;
    mahara = 0;

    var l = 0;
    // chrome.runtime.sendMessage({
    //   data: "CHECK_MSG_FLOW"
    // }, function(response) {
    //   console.log('CHECK_MSG_FLOW_RESPONSE');
    //   console.log(response);
    // });

    chrome.tabs.query({
        //active: true,
        //currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tab_id, {
            data: "CHECK_MSG_FLOW"
        }, function (response) {
            console.log('RESPONSE:CHECK_MSG_FLOW');
            console.log(response);
            l = response;
        });
    });

    console.log('l:' + l);
    var r = t || Math.floor(Math.random() * 6) + 1;
    console.log('Dice:' + r);
    r = 3;

    // reset the global counters
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
    if (r === 4) {
        Localhost();
    }

    if (r === 5) {
        LocalhostTestNet();
    }

    if (r === 6) {
        Mahara();
    }
}

function startIgnition() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.update(tab_id, {
            url: '/starter.html'
        }, function (tab) {
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
                    chrome.tabs.executeScript(tabId, {
                        file: "scripts/ttt.js",
                        allFrames: true
                    }, function (results) {
                        console.log(results)
                    });
                    chrome.tabs.sendMessage(tabId, {
                        data: "startIgnition"
                    }, function (response) {
                        console.log('from startIgnition()');
                        console.log(response);
                    });
                }
            });
        });
    });
}

function Facebook() {
    //    var tab_id = localStorage.getItem('tabId');
    //    tab_id = parseInt(tab_id);
    console.log('surf:Facebook is called');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        //myTabID = tab_id || tabs[0].id;
        chrome.tabs.update(
            //tabs[0].id, {
            //tab_id, {
            //myTabID, {
            tab_id, {
                url: 'https://www.facebook.com/en7erafatamnaldawla'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    //if (tabId === tab.id && changeInfo.status == 'complete') {
                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        // Now the tab is ready!
                        // Now the tab is ready!
                        chrome.tabs.executeScript(tabId, {
                            file: "scripts/ttt.js",
                            allFrames: true
                        }, function (results) {
                            console.log(results)
                        });
                        console.log('surf.js:tabId:' + tabId);
                        chrome.tabs.sendMessage(tabId, {
                            data: "doFacebookStuff"
                        }, function (response) {
                            console.log('from Facebook()');
                            console.log(response);
                        });
                    }
                });
            });
    });
}

function Wordpress() {
    //    var tab_id = localStorage.getItem('tabId');
    //    tab_id = parseInt(tab_id);
    console.log('Wordpress is callled ');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        //myTabID = tab_id || tabs[0].id;
        chrome.tabs.update(
            //tabs[0].id, {
            //tab_id, {
            //myTabID, {
            tab_id, {
                //tabs[0].id, {
                //tab_id, {
                url: 'https://amnaldawla.wordpress.com'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        // Now the tab is ready!
                        chrome.tabs.executeScript(tabId, {
                            file: "scripts/ttt.js",
                            allFrames: true
                        }, function (results) {
                            console.log(results)
                        });
                        // Now the tab is ready!
                        chrome.tabs.sendMessage(tabId, {
                            data: "doWordpressStuff"
                        }, function (response) {
                            console.log('from Wordpress()');
                            console.log(response);
                        });
                    }
                });
            });
    });
}

function Mahara() {
    var listener;
    console.log('Mahra is callled ');
    console.log('reset mahara')
    mahara = 0;
    console.log(mahara);
    chrome.tabs.update(
        tab_id, {
            url: 'http://localhost.mahara.net/user/view.php?id=2'
        },
        function (tab) {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status == 'loading') {
                    updateIcon2();
                }
                if (tabId === tab.id && changeInfo.status == 'complete') {
                    console.log('mahara:' + mahara);
                    mahara++;
                    chrome.tabs.sendMessage(tabId, {
                        data: "doMaharaStuff_REQ",
                    }, function (response) {
                        console.log('from content.js');
                        console.log(response.message);
                        if (response.message === "doMaharaStuff_REQ:CONFIRMED") {
                            console.log('doMaharaStuff_REQ:CONFIRMED:1');
                            chrome.tabs.insertCSS(tabId, {
                                code: "#elnamosia {position: fixed !important;width: 100% !important;height: 100% !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;}",
                                allFrames: true,
                                runAt: "document_start"
                            }, function (results) {
                                //console.log(results);
                            });
                            chrome.tabs.executeScript(tabId, {
                                code: "$('<div id=\"elnamosia\"></div>').appendTo(\"body\")",
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/mahara.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.onUpdated.removeListener(listener);
                            console.log('doMaharaStuff_REQ:CONFIRMED:2');
                        }
                    });
                }
            });
        });
}

function Twitter() {
    var listener;
    console.log('Twitter is callled ');
    console.log('reset twitter')
    twitter = 0;
    console.log(twitter);
    chrome.tabs.update(
        tab_id, {
            url: 'https://twitter.com/'
        },
        function (tab) {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (chrome.tabs.onUpdated.hasListener(listener)) {
                    console.log('listening..');
                }
                if (tabId === tab.id && changeInfo.status == 'loading') {
                    updateIcon2();
                }
                if (tabId === tab.id && changeInfo.status == 'complete') {
                    console.log('twitter:' + twitter);
                    twitter++;
                    chrome.tabs.sendMessage(tabId, {
                        data: "doTwitterStuff_REQ",
                    }, function (response) {
                        console.log('from content.js:');
                        console.log(response);
                        console.log(response.message);
                        if (response.message === "doTwitterStuff_REQ:CONFIRMED") {
                            console.log('doTwitterStuff_REQ:CONFIRMED:1');
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/jquery.min.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/helpers.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/bililiteRange.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/jquery.sendkeys.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/jquery.typetype.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });
                            chrome.tabs.executeScript(tabId, {
                                file: "scripts/twitter.js",
                                //allFrames: true,
                                frameId: 0,
                                runAt: "document_end"
                            }, function (results) {
                                //console.log(results)
                            });

                            console.log('will send confirmation');
                            var responseObject = {
                                data: "doTwitterStuff_RES",
                            };
                            //chrome.tabs.runtime.sendMessage(responseObject);
                            //chrome.runtime.sendMessage(responseObject);
                            chrome.tabs.sendMessage(tab_id, responseObject);
                            //zoltrix
                            //sendConfirmation(responseObject);
                            chrome.tabs.onUpdated.removeListener(listener);
                            console.log('LISTENER REMOVED');
                        }
                    });
                }
            });
        });
}



function Localhost() {
    var myTabID = null;
    var tab_id = localStorage.getItem('tabId');
    tab_id = parseInt(tab_id);
    console.log('Localhost is callled ');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        myTabID = tab_id || tabs[0].id;
        chrome.tabs.update(
            //tabs[0].id, {
            //tab_id, {
            myTabID, {
                //tab_id, {
                //url: 'http://localhost/'
                url: 'http://localhost/?p=789#respond'
                //pinned: true
            },
            function (tab) {
                // chrome.tabs.setZoom(myTabID, 0.85, function() {
                //   console.log("setZoom");
                // });
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'loading') {
                        updateIcon2();
                        // console.log('injecting CSS');
                        // chrome.tabs.insertCSS(tabId,{
                        //   //file: "css/myactivetab.css",
                        //   //allFrames: true
                        //   code: "#elmotasha3eb {position: fixed !important;width: 100% !important;height: 100% !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;}"
                        // }, function(results) {
                        //   console.log(results);
                        // });
                        //
                        // chrome.tabs.executeScript(tabId, {
                        //   code: "document.body.style.zoom = \"80%\";$('<div id=\"elmotasha3eb\"></div>').appendTo(\"body\");",
                        // }, function(results) {
                        //   console.log(results)
                        // });
                    }

                    if (tabId === tab.id && changeInfo.status == 'complete' && !localhost) {
                        localhost++;
                        // Now the tab is ready!
                        // var updateProperties = {
                        //   favIconUrl: "/icons/on5.png",
                        //   title: "testing"
                        // }
                        // chrome.tabs.update(myTabID, updateProperties, function(){
                        //   console.log('updated');
                        // })
                        // chrome.tabs.insertCSS(tabId,{
                        //   //file: "css/myactivetab.css",
                        //   //allFrames: true
                        //   code: "#elmotasha3eb {position: fixed !important;width: 100% !important;height: 100% !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;}"
                        // }, function(results) {
                        //   console.log(results);
                        // });
                        //
                        // chrome.tabs.executeScript(tabId, {
                        //   code: "$('<div id=\"elmotasha3eb\"></div>').appendTo(\"body\");",
                        // }, function(results) {
                        //   console.log(results)
                        // });

                        chrome.tabs.executeScript(tabId, {
                            file: "scripts/localhost.js",
                            allFrames: true
                        }, function (results) {
                            console.log(results)
                        });
                        chrome.tabs.sendMessage(tabId, {
                            data: "doLocalhostStuff"
                        }, function (response) {
                            console.log('from Localhost()');
                            console.log(response);
                        });
                    }
                });
            });
    });
}

function LocalhostTestNet() {
    //    var myTabID = null;
    //    var tab_id = localStorage.getItem('tabId');
    //    tab_id = parseInt(tab_id);
    console.log('LocalhostTestNet is callled ');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        //myTabID = tab_id || tabs[0].id;
        chrome.tabs.update(
            //tabs[0].id, {
            //tab_id, {
            //            myTabID, {
            //                url: 'http://localhost.test.net/'
            //            },
            tab_id, {
                url: 'http://localhost.test.net/'
            },
            function (tab) {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status == 'loading') {
                        updateIcon2();
                    }

                    if (tabId === tab.id && changeInfo.status == 'complete') {
                        localhostTestNet++;

                        chrome.tabs.insertCSS(tabId, {
                            code: "#elnamosia {position: fixed !important;width: 100% !important;height: 100% !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;}",
                            allFrames: true,
                            runAt: "document_start"
                        }, function (results) {
                            //console.log(results);
                        });

                        chrome.tabs.executeScript(tabId, {
                            file: "scripts/test.js",
                            //allFrames: true,
                            frameId: 0,
                            runAt: "document_end"
                        }, function (results) {
                            //console.log(results)
                        });

                        chrome.tabs.executeScript(tabId, {
                            code: "if($(\"#elnamosia\").length==0) $('<div id=\"elnamosia\"></div>').appendTo(\"body\")",
                        }, function (results) {
                            //console.log(results)
                        });
                        /*
                        chrome.tabs.executeScript(tabId, {
                            code: "function doItNow() {chrome.runtime.sendMessage({data: \"doItNow_REQUEST\"}, function (response) {});};if($(\"#elnamosia\").length==0) $('<div id=\"elnamosia\"><button id=\"btnNow2\" onclick=\"doItNow();\">od it now</button></div>').appendTo(\"body\")",
                        }, function (results) {
                            //console.log(results)
                        });
                        */

                        chrome.tabs.sendMessage(tabId, {
                            data: "doLocalhostTestNetStuff"
                        }); //, function (response) {
                        //console.log('from LocalhostTestNet()');
                        //console.log(response);
                        //});
                    }
                });
            });
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    var key = null;
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

eventList.forEach(function (e) {
    chrome.webNavigation[e].addListener(function (data) {
        if (typeof data)
            //console.log(chrome.i18n.getMessage('inHandler'), e, data);
            updateIcon(tab_id);
        //else
        //console.error(chrome.i18n.getMessage('inHandlerError'), e);
    });
});

function updateIcon2() {
    //console.log('updateIcon');
    rocknroll = localStorage.getItem('rocknroll');
    if (rocknroll) {
        if (!tab_id)
            return;
        if (rocknroll == 'true') {
            // for here add more than one icon and rolling between them
            //
            var r = Math.floor(Math.random() * 6);
            chrome.browserAction.setIcon({
                path: "/icons/on" + r + ".png",
                tabId: tab_id
            });
            /*
            var tabId = localStorage.getItem('tabId') || 0;
            if (!tabId) {
                localStorage.setItem('tabId', tabId);
                console.log('setting tabId');
                chrome.storage.local.set({
                    'tabId': tabId
                }, function () {
                    // Notify that we saved.
                    console.log('surf:Settings saved');
                });
            }
            */
        } else {
            chrome.browserAction.setIcon({
                path: "/icons/off.png",
                tabId: tabId
            });
        }
    }
}

function updateIcon(data) {
    //console.log('updateIcon');
    rocknroll = localStorage.getItem('rocknroll');
    if (rocknroll) {
        if (!tab_id)
            return;

        if (rocknroll == 'true') {
            // for here add more than one icon and rolling between them
            //
            var r = Math.floor(Math.random() * 6);
            chrome.browserAction.setIcon({
                path: "/icons/on" + r + ".png",
                tabId: tab_id
            });
            /*
            var tabId = localStorage.getItem('tabId') || 0;
            if (!tabId) {
                localStorage.setItem('tabId', data.tabId);
                console.log('setting tabId');
                chrome.storage.local.set({
                    'tabId': data.tabId
                }, function () {
                    // Notify that we saved.
                    console.log('surf:Settings saved');
                });
            }
            */
        } else {
            chrome.browserAction.setIcon({
                path: "/icons/off.png",
                tabId: data.tabId
            });
        }
    }
}

function sendConfirmation(object) {
    //chrome.runtime.sendMessage(object);
    chrome.tabs.sendMessage(tab_id, object);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('background.js:' + msg);
    var data = msg.data || msg.message || {};
    console.log('msg:');
    console.log(msg);
    console.log('data:');
    console.log(data);

    //var data = msg;

    // if data match CHECK_MSG_FLOW_RESPONSE:<NUMBER>
    // get the <NUMBER> and evaluate rulling the dice OR should wait for the current process to finished
    // ZOLTRIX

    if (data === 'nextRun_REQ') {
        var n = nextRunSchedule();
        var responseObject = {
            message: "nextRun_RES",
            nextRun: n
        };
        console.log('will rollTheDice in ' + n + 's');
        sendResponse(responseObject);
    }

    if (data === 'doItNow_REQUEST') {
        console.log('doItNow_REQUEST is called');
        //setTimeout(rollTheDice, 1000);
        sendResponse('doItNow_REQUEST:CONFIRMED');
        rollTheDice();
    }

    if (data === 'TRYAGAIN') {
        console.log('TRYAGAIN is sent');
        //setTimeout(rollTheDice, 1000);
        rollTheDice();
    }

    if (data === 'doTwitterStuff_ERROR:CONF_HIDDEN') {
        var responseObject = {
            message: "doTwitterStuff_ERROR:CONF_HIDDEN:CONFIRMED",
        };
        console.log('doTwitterStuff_ERROR');
        console.log('WILL Try Again');
        sendResponse(responseObject);
        rollTheDice();
    }

    if (data === 'doTwitterStuff_DONE') {
        var responseObject = {
            message: "doTwitterStuff_DONE:CONFIRMED",
        };
        sendResponse(responseObject);
        console.log('Twitter STUFF IS DONE!');
    }

    if (data === 'doTwitterStuff_SENT') {
        console.log('doTwitterStuff SENT');
        var responseObject = {
            message: "doTwitter_SENT:CONFIRMED"
        };
        incrementBadge();
        sendResponse(responseObject);
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

    if (data === 'doLocalhostNet_SENT') {
        var responseObject = {
            message: "doLocalhostNet_SENT:CONFIRMED"
        };
        sendResponse(responseObject);
        console.log('LocalhostNet STUFF IS DONE!');
    }

    if (data === 'doMahara_SENT') {
        var responseObject = {
            message: "doMahara_SENT:CONFIRMED"
        };
        sendResponse(responseObject);
        console.log('doMahara STUFF IS DONE!');
        console.log('listener removed');
        //console.log('will rollTheDice in ' + n + 's');
    }
    if (data === 'doMaharaStuff_DONE') {
        var responseObject = {
            message: "doMaharaStuff_DONE:CONFIRMED",
        };
        sendResponse(responseObject);
        console.log('doMaharaStuff_DONE:CONFIRMED');
        console.log('logging...');
    }

    if (data === 'doLocalhostNet_DONE') {
        sendResponse('doLocalhostNet_DONE:CONFIRMED');
        console.log('LocalhostNet STUFF IS DONE!');
        console.log('logging...');
    }

    /* no includes here!
    if (data.includes("doLocalhostNet_ERROR")) {
        sendResponse('doLocalhostNet_ERROR:LOGGED');
        console.log('LocalhostNet got ERROR!');
        console.log('logging...');
    }
    */

    if (data === 'surfStartIgnition') {
        console.log('surfStartIgnition:CONFIRMED')
        sendResponse('surfStartIgnition_DONE');
        rollTheDice();
        //console.log('Wordpress STUFF IS DONE!');
    }

    if (data === 'startEngine') {
        console.log('startEngine:CONFIRMED')
        sendResponse('startEngine_DONE');
        startEngine();
    }
});

function incrementBadge() {
    var rounds = localStorage.getItem('sessionRounds') || 0;
    rounds++;
    localStorage.setItem('sessionRounds', rounds);
    chrome.storage.local.set({
        'sessionRounds': rounds
    }, function () {
        // Notify that we saved.
        console.log('BADGE updated');
    });

    chrome.browserAction.setBadgeText({
        "text": rounds.toString()
    });

}
