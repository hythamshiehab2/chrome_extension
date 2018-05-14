"use strict";
//var messageToSpread = generateIdea();
var randomIndex = Math.floor(Math.random() * links.length);
var messageToSpread = getText(randomIndex);
//var messageToSpread = 'sdfsdfsdf';
//messageToSpread = messageToSpread.substr(0, 200);
var link = getLink(randomIndex);
//var link = 'https://amnaldawla.wordperss.com';
var nextRun = 0;
//messageToSpread = ' ' + messageToSpread;
var myCachedObject = null;
var promiseCalled = 0;
var tries = 60; //60s should be enough to the tweet box dialog to show!
var stArtEd = 0;
var typing = false;
//$.noConflict();

window.addEventListener('online', function (e) {
    console.log('LISTENER:ONLINE!')
}, false);

window.addEventListener('offline', function (e) {
    console.log('LISTENER:OFFLINE!')
}, false);

function doItNow() {
    chrome.runtime.sendMessage({
        data: "doItNow_REQUEST"
    }, function (response) {});
}

function nextStep() {
    var s = nextRun / 1000;
    var m = s / 60;
    var e = document.getElementById('elnamosia');
    var d = document.createElement("div");
    var c = document.createElement("div");

    d.id = "myCounter";
    d.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;text-align:left;padding-top: 20px;background-color:rgba(22, 182, 22, 0.71);";
    e.appendChild(d);
    c.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;float:right;";
    e.appendChild(c);
    var k = document.getElementById("myStartNowButton");
    k.style = "box-shadow: 1px 1px 3px 3px black;float: right;background-color: greenyellow;visibility: visible;border: 2px !important;border-color: red !important;border-style: dashed;padding-right: 10px;padding-left: 10px;padding-top: 2px;padding-bottom: 2px;margin-right:20px !important;";
    c.appendChild(k);
    var timeleft = s;
    var downloadTimer = setInterval(function () {
        timeleft--;
        m = Math.floor(timeleft / 60);
        d.innerHTML = ' هاصحى كمان ' + timeleft + ' ثانيه ' + ' بالدقائق: ' + m + ' دقيقه ';
        if (timeleft <= 0)
            clearInterval(downloadTimer);
    }, 1000);
}

function superVisor() {
    var myTries = 280;
    return new Promise(function cb(resolve, reject) {
        var c = document.getElementsByClassName('message-inside')[0];
        //console.log(myTries + ' remaining');
        if ((--myTries > 0) && (!$(c).is(':visible'))) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 500);
        } else {
            if (!$(c).is(':visible')) {
                //console.log('hidden');
                reject('CONF_HIDDEN');
            } else {
                //highlightObject(c);
                console.log('visible');
                resolve('CONF_VISIBLE');
            }
        }
    });
}

function stArt() {
    var myTries = 60;
    //    if (stArtEd)
    //        return;
    //    stArtEd++;    
    return new Promise(function cb(resolve, reject) {
        //var c = getElementByXpath('//*/div[1]/div/div[1]/div[2]/div/div/div/div/div/div[2]/div');
        //var c = document.getElementsByTagName('textarea')[0].parentElement;

        // mobile version
        var c = document.querySelectorAll('[role="textbox"]')[0];
        //c = c[0];
        console.log(c);
        console.log(myTries + ' remaining');
        if ((--myTries > 0) && (c == null)) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!c) {
                console.log('hidden');
                reject('TBTN_FAILED');
            } else {
                //highlightObject(c);
                myCachedObject = c;
                console.log('visible');
                resolve('TBTN_SUCCESS');
            }
        }
    });
}

function highlightObject(elem) {
    $(elem).toggle("highlight", {
        color: "green"
    }, 1000);
    $(elem).toggle("highlight", {
        color: "green"
    }, 1000);
}

function newPostButton_mouseover() {
    console.log('newPostButton_mouseover');
    console.log(myCachedObject);
    return new Promise((resolve, reject) => {
        var b = simulate(myCachedObject, "mouseover");
        console.log(b);
        if (b) {
            console.log('FB_NEW_POST_MOUSEOVER_SUCCESS');
            myCachedObject = b;
            resolve('FB_NEW_POST_MOUSEOVER_SUCCESS');
        } else {
            console.log('FB_NEW_POST_MOUSEOVER_FAILED');
            reject('FB_NEW_POST_MOUSEOVER_FAILED');
        }
    });
}

function newPostButton_click() {
    console.log('newPostButton_click');
    console.log(myCachedObject);
    var b = null;
    return new Promise((resolve, reject) => {
        b = simulate(myCachedObject, "mousedown");
        b = simulate(myCachedObject, "mouseup");
        b = simulate(myCachedObject, "click");
        console.log(b);
        if (b) {
            console.log('FB_NEW_POST_CLICK_SUCCESS');
            myCachedObject = b;
            resolve('FB_NEW_POST_CLICK_SUCCESS');
        } else {
            console.log('FB_NEW_POST_CLICK_FAILED');
            reject('FB_NEW_POST_CLICK_FAILED');
        }
    });
}

function composeTextBoxVisible() {
    return new Promise(function cb(resolve, reject) {
        //uniqid_1
        //var c = document.getElementById('uniqid_1');
        var c = myCachedObject;
        console.log(c);
        console.log(tries + ' remaining');
        if ((--tries > 0) && (!$(c).is(':visible'))) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!$(c).is(':visible')) {
                console.log('hidden');
                reject('FB_COMPOSE_TEXTBOX_HIDDEN');
            } else {
                //highlightObject(c);
                //myCachedObject = c;
                console.log('FB_COMPOSE_TEXTBOX_VISIBLE');
                resolve('FB_COMPOSE_TEXTBOX_VISIBLE');
            }
        }
    });
}

function composeTextBox_mouseover() {
    console.log('composeTextBox_mouseover');
    return new Promise((resolve, reject) => {
        myCachedObject = simulate(myCachedObject, "mouseover");
        resolve('FB_composeTextBox_MOUSEOVER_SUCCESS');
    });
}

function composeTextBox_click() {
    console.log('composeTextBox_click');
    return new Promise((resolve, reject) => {
        myCachedObject = simulate(myCachedObject, "mousedown");
        myCachedObject = simulate(myCachedObject, "mouseup");
        myCachedObject = simulate(myCachedObject, "click");
        resolve('FB_composeTextBox_CLICK_SUCCESS');
    });
}

function anotherClick() {
    return new Promise((resolve, reject) => {
        console.log('anotherClick');
        console.log(myCachedObject);
        myCachedObject = simulate(myCachedObject, "mousedown");
        myCachedObject = simulate(myCachedObject, "mouseup");
        myCachedObject = simulate(myCachedObject, "click");
        resolve('TX_ANOTHER_CLICK');
    });
}

function typePost() {
    return new Promise((resolve, reject) => {
        console.log('typePost');
        console.log(myCachedObject);
        $(myCachedObject).focus().sendkeys(messageToSpread);
        console.log('will type:' + messageToSpread + 'in ' + myCachedObject);
        resolve('FB_POST_TYPED');
    });
}

/*
function typeTweetBox2() {
    return new Promise((resolve, reject) => {
        console.log('typeTweetBox2');
        //simulate(myCachedObject, "mouseup");
        //$(myCachedObject).focus().sendkeys(messageToSpread);
        //var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
        //b = simulate(b, "mouseup");
        //var t = myCachedObject;
        //t = simulate(t, "click");
        //var t = b;
        console.log('will type:' + messageToSpread + 'in ' + myCachedObject);
        //resolve('TX_TYPED');
        var elem = myCachedObject;
        $(myCachedObject).focus().typetype(messageToSpread, {
            //e: 0.04, // error rate. (use e=0 for perfect typing)
            //t: 100, // interval between keypresses
            keypress: function (data) {
                // called after every keypress (this may be an erroneous keypress!)
                //console.log('typeing...')
                //console.log(data);
                //console.log(this);
                //$(myCachedObject).focus().sendkeys('{ArrowLeft}');
                //$(myCachedObject).focus().sendkeys('{ArrowRight}');
                //$(myCachedObject).focus().sendkeys('{mark}');
                //var e = myCachedObject.innerText.substr(myCachedObject.innerText.length - 1, 1);
                //console.log(e);
                //$(myCachedObject).focus().sendkeys('{backspace}');
                //$(myCachedObject).focus().sendkeys(e);
            },
            callback: function () {
                // the `this` keyword is bound to the particular element.
                resolve('TX_TYPED');
            }
        });
    });
}
*/
function addLinks() {
    console.log('addLinks');
    return new Promise((resolve, reject) => {
        //var b = myCachedObject;
        //var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
        $(myCachedObject).focus().sendkeys('{Enter}');
        //$(b).sendkeys('{Enter}');
        $(myCachedObject).focus().sendkeys(link);
        resolve('FB_LINKS');
    });
}

function postButton_mouseover() {
    console.log('clickPostButton');
    return new Promise((resolve, reject) => {
        var c = document.querySelector('[data-sigil^="touchable submit_composer"]');
        myCachedObject = simulate(c, "mouseover");
        resolve('FB_Post_Button_MOUSEOVER');
    });
}

function postButton_click() {
    console.log('clickPostButton');
    return new Promise((resolve, reject) => {
        myCachedObject = simulate(myCachedObject, "mousedown");
        myCachedObject = simulate(myCachedObject, "mouseup");
        myCachedObject = simulate(myCachedObject, "click");
        resolve('FB_Post_Button_CLICKED');
    });
}

function elapseSomeTime() {
    console.log('elapseSomeTime');
    tries = 7;
    return new Promise(function cb(resolve, reject) {
        console.log(tries + ' remaining');
        var c = document.getElementById('uniqid_1');
        if ((--tries > 0) && (!$(c).is(':visible'))) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!$(c).is(':visible')) {
                console.log('hidden');
                reject('TX_HIDDEN');
            } else {
                console.log(c);
                myCachedObject = c;
                console.log('TIME_ELAPSED');
                resolve('TIME_ELAPSED');
            }
        }
    });
}

function elapseSomeTime2() {
    console.log('elapseSomeTime2');
    tries = 7;
    return new Promise(function cb(resolve, reject) {
        console.log(tries + ' remaining');
        if (--tries > 0) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 1000);
        } else {
            console.log('TIME_ELAPSED');
            resolve('TIME_ELAPSED');
        }
    });
}

$(document).ready(function () {
    //document.addEventListener("DOMContentLoaded", function (event) {
    if (navigator.onLine) {
        console.log('ONLINE!');
    }

    console.log("DOM fully loaded and parsed");
    //$(document).ready(function($){
    console.log('Am I ready!?');

    var e = document.createElement("div");
    e.id = "elnamosia";
    e.style = "position: fixed !important;width: 100% !important;height: 100% !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;background-color: rgba(93, 51, 204, 0.29) !important;z-index: 10000000 !important;cursor: pointer !important;";

    var button = document.createElement("button");

    chrome.runtime.sendMessage("mpnhfhekacdacnjkegjdmfgjfkckacea", {
        data: "nextRun_REQ"
    }, function (response) {
        console.log(response);
        nextRun = response.nextRun;
    });

    function doItNow() {
        chrome.runtime.sendMessage("mpnhfhekacdacnjkegjdmfgjfkckacea", {
            data: "doItNow_REQUEST"
        }, function (response) {
            console.log(response);
        });
    }

    button.id = "myStartNowButton";
    button.style = "visibility: hidden;";
    button.textContent = "دوّرها";
    button.addEventListener("click", doItNow, false);

    e.appendChild(button);
    document.body.appendChild(e);

    var whatToDo = Math.floor(Math.random() * 2);
    whatToDo = 1;
    if (whatToDo) {
        if (!stArtEd) {
            superVisor()
                .then(function (data) {
                    console.log(data);
                    if (data == 'CONF_VISIBLE') {
                        chrome.runtime.sendMessage({
                            data: "doFacebookStuff_DONE"
                        }, function (response) {
                            console.log("from facebook.js:" + response);
                            console.log(response);
                        });
                    }
                    if (data == 'CONF_HIDDEN') {
                        chrome.runtime.sendMessage({
                            data: "doFacebookStuff_ERROR:CONF_HIDDEN"
                        });
                    }
                })
                .catch(function (data) {
                    var error = "doFacebookStuff_ERROR:" + data;
                    chrome.runtime.sendMessage({
                        data: error
                    }, function (response) {
                        console.log("from facebook.js:" + response);
                        console.log(response);
                    });
                });

            stArt()
                .then(newPostButton_mouseover)
                .then(newPostButton_click)
                .then(elapseSomeTime)
                .then(composeTextBox_mouseover)
                .then(composeTextBox_click)
                .then(typePost)
                .then(addLinks)
                .then(elapseSomeTime2)
                .then(postButton_mouseover)
                .then(postButton_click)
                .then(function () {
                    chrome.runtime.sendMessage({
                        data: "doFacebookStuff_SENT"
                    }, function (response) {
                        console.log(response);
                        console.log("from test.js:" + response);
                        console.log(response.message);
                        console.log(response.next);
                        nextStep();
                    });
                })
                .catch(function (data) {
                    console.log('CATCH:' + data);
                });
        }
    } else {
        console.log('start clapping');
        stArt()
            .then(clickTweetButton)
            .then(Clapping1)
            .then(Clapping2)
            .then(Clapping3)
            .then(Clapping4)
            .catch(function (data) {
                console.log(data);
            });
    }
});

function begin() {
    console.log('at begin');
}
