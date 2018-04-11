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
/*
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

console.log ('background..');

function set_status() {
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
