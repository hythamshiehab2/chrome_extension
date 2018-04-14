function checkForValidURL(tabId, info, tab) {
//function checkForValidURL() {
  console.log('checkForValidURL is called:' + tabId + ':' + info + ':' + tab);
}

var ExtensionDataName = "myfirstextensiondata";
var ExtensionData = {
  dataVersion: 3, //if you want to set a new default data, you must update "dataVersion".
  villages: []
};

chrome.storage.onChanged.addListener(function(changes,areaName) {
  console.log('storage changed');
  //"sync","local" or "managed"
  console.log(changes + ':' + areaName);
});
//default data

ExtensionData.villages.push(
    {id: "1325848", name: "village1"},
    {id: "8744351", name: "village2"},
    {id: "8952187", name: "village3"}
);
DB_save();

function DB_setValue(name, value, callback) {
    var obj = {};
    obj[name] = value;
    console.log("Data Saved!");
    chrome.storage.local.set(obj, function() {
        if(callback) callback();
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
        if(callback) callback();
    });
}

function DB_clear(callback) {
    chrome.storage.local.remove(ExtensionDataName, function() {
        if(callback) callback();
    });
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
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
chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
  console.log('listening...');
  //if (tabId === tabs[0].id && changeInfo.status == 'complete') {
  if (changeInfo.status == 'complete') {
    console.log('status complete');
    //chrome.tabs.onUpdated.removeListener(listener);
    // Now the tab is ready!
    chrome.tabs.sendMessage(tabId, {data: "start"});
  }
});

/*
var counter = 0;
chrome.browserAction.onClicked.addListener(function (tab) {
    counter++;
    if (counter == 5) {
        alert("Hey !!! You have clicked five times");
    }
});
*/
/*
var enable=false;
console.log('starting..');
chrome.browserAction.onClicked.addListener(function (tab) {
 enable = enable ? false : true;
 if(enable){
  //turn on...
  chrome.browserAction.setIcon({ path: 'icons/on.png' });
  chrome.browserAction.setBadgeText({ text: 'ON' });
  chrome.tabs.executeScript(null, { file: 'scripts/content.js' });
 }else{
  //turn off...
  chrome.browserAction.setIcon({ path: 'icons/off.png'});
  chrome.browserAction.setBadgeText({ text: 'OFF' });
 }
});
var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('from background');
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "icons/on.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file:"scripts/surf.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "icons/off.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert()"});
  }
});

*/

/*
var toggle = false;
var status = 'off';
var the_tab_id = '';

var func = function(sender){
    alert("Success!" + sender);
    //set_status();
    toggle_extension(sender);
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "startFunc") func(sender);
    }
);

function set_status() {
    console.log('set status');
    toggle = !toggle;
    status = 'off';
    if(toggle) { status = 'on'; }
}

function toggle_extension(tab){
    // Set icon
    console.log('called');
    chrome.browserAction.setIcon({ path: 'icons/' + status + '.png', tabId:tab.id });
    // Pass variable & execute script
    chrome.tabs.executeScript({ code: 'var extension_status = "'+status+'"' });
    chrome.tabs.executeScript({ file: 'scripts/inject.js' });
    // Set the tab id
    the_tab_id = tab.id;
}

function my_listener(tabId, changeInfo, tab) {
    // If updated tab matches this one
    if (changeInfo.status == "complete" && tabId == the_tab_id && status == 'on') {
        toggle_extension(tab);
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    set_status();
    toggle_extension(tab);
});

chrome.tabs.onUpdated.addListener(my_listener);
*/
