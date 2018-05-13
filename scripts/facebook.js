"use strict";
//var messageToSpread = generateIdea();
var randomIndex = Math.floor(Math.random() * links.length);
var messageToSpread = getText(randomIndex);
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

function Clapping1() {
    var myTries = 60;
    console.log('Clapping1');
    return new Promise(function cb(resolve, reject) {
        // gif button
        myCachedObject = document.getElementsByClassName('btn js-found-media-search-trigger js-dropdown-toggle icon-btn js-tooltip')[0];
        simulate(myCachedObject, "click");
        console.log(myCachedObject);

        // list of gifs
        //document.getElementsByClassName('FoundMediaSearch-category')

        // list of clapping images
        //document.getElementsByClassName('FoundMediaSearch-item FoundMediaSearch-item--visible'); 

        //gif is loading div

        console.log(myTries + ' remaining');
        if ((--myTries > 0) && (myCachedObject == null)) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!myCachedObject) {
                console.log('hidden');
                reject('CLPN_HIDDEN');
            } else {
                console.log('visible');
                resolve('CLPN_SUCCESS');
            }
        }
    });
}

function Clapping2() {
    return new Promise((resolve, reject) => {
        //highlightObject(b);
        console.log('Clapping2');

        myCachedObject = simulate(myCachedObject, "click");
        myCachedObject = simulate(myCachedObject, "mousedown");
        console.log(myCachedObject);
        if (myCachedObject) {
            console.log('CLPN_CLICK_SUCCESS');
            resolve('CLPN_CLICK_SUCCESS');
        } else {
            console.log('CLPN_CLICK_FAILED');
            reject('CLPN_CLICK_FAILED');
        }
    });
}

function Clapping3() {
    return new Promise(function cb(resolve, reject) {
        //var c = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
        var c = document.getElementsByClassName('FoundMediaSearch-dropdownMenu dropdown-menu')[0];
        console.log(tries + ' remaining');
        if ((--tries > 0) && (!$(c).is(':visible'))) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!$(c).is(':visible')) {
                console.log('hidden');
                reject('CLPN_HIDDEN');
            } else {
                //highlightObject(c);
                myCachedObject = c;
                console.log('visible');
                resolve('CLPN_VISIBLE');
            }
        }
    });
}

//document.getElementsByClassName('FoundMediaSearch-category')
function Clapping4() {
    return new Promise(function cb(resolve, reject) {
        //var c = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
        var c = document.getElementsByClassName('FoundMediaSearch-category');
        var t = Math.floor(Math.random() * c.length);
        simulate(t, "click");
        resolve("CLPN_CAT_CLICK");
    });
}

function stArt() {
    var myTries = 60;
    //    if (stArtEd)
    //        return;
    //    stArtEd++;    
    return new Promise(function cb(resolve, reject) {
        //var c = getElementByXpath('//*/div[1]/div/div[1]/div[2]/div/div/div/div/div/div[2]/div');
        var c = document.getElementsByTagName('textarea')[0].parentElement;
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

function clickTweetButton() {
    console.log('clickTweetButton');
    console.log(myCachedObject);
    return new Promise((resolve, reject) => {
        var b = simulate(myCachedObject, "click");
        console.log(b);
        if (b) {
            console.log('TBTN_CLICK_SUCCESS');
            myCachedObject = b;
            resolve('TBTN_CLICK_SUCCESS');
        } else {
            console.log('TBTN_CLICK_FAILED');
            reject('TBTN_CLICK_FAILED');
        }
    });
}

function tweetBoxVisible() {
    return new Promise(function cb(resolve, reject) {
        //var c = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
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
                reject('TX_HIDDEN');
            } else {
                //highlightObject(c);
                myCachedObject = simulate(c, "click");
                console.log('TX_VISIBLE');
                resolve('TX_VISIBLE');
            }
        }
    });
}

function clickTweetBox() {
    console.log('clickTweetBox');
    return new Promise((resolve, reject) => {
        var b = document.getElementsByClassName('navigationFocus')[1];
        myCachedObject = simulate(b, "click");
        resolve('TX_CLICKED');
    });
}

function typeTweetBox1() {
    return new Promise((resolve, reject) => {
        console.log('typeTweetBox1');
        if (typing)
            return;
        typing = true;
        $(myCachedObject).focus().sendkeys(messageToSpread);
        //$(myCachedObject).focus().sendkeys('{selectall}');
        //$(myCachedObject).focus().sendkeys('{del}');
        console.log('will type:' + messageToSpread + 'in ' + myCachedObject);
        resolve('TX_TYPED');
    });
}

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
                var e = myCachedObject.innerText.substr(myCachedObject.innerText.length - 1, 1);
                console.log(e);
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

function addLinks() {
    console.log('addLinks');
    return new Promise((resolve, reject) => {
        //var b = myCachedObject;
        //var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
        $(myCachedObject).focus().sendkeys('{Enter}');
        //$(b).sendkeys('{Enter}');
        $(myCachedObject).focus().sendkeys(link);
        resolve('TX_LINKS');
    });
}

function clickTweetSend() {
    console.log('clickTweetSend');
    return new Promise((resolve, reject) => {
        var c = document.querySelectorAll('[data-testid="react-composer-post-button"]')[0];
        myCachedObject = simulate(c, "click");
        resolve('TX_SEND');
    });
}

function elapseSomeTime() {
    //tries = Math.floor(Math.random() * 20) + 10;
    tries = 3;
    return new Promise(function cb(resolve, reject) {
        console.log(tries + ' remaining');
        if (--tries > 0) {
            console.log(tries + ' remaining');
            setTimeout(function () {
                cb(resolve, reject);
            }, 1000);
        } else {
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
                            data: "doTwitterStuff_DONE"
                        }, function (response) {
                            console.log("from test.js:" + response);
                            console.log(response);
                        });
                    }
                    if (data == 'CONF_HIDDEN') {
                        chrome.runtime.sendMessage({
                            data: "doTwitterStuff_ERROR:CONF_HIDDEN"
                        });
                    }
                })
                .catch(function (data) {
                    var error = "doTwitterStuff_ERROR:" + data;
                    chrome.runtime.sendMessage({
                        data: error
                    }, function (response) {
                        console.log("from test.js:" + response);
                        console.log(response);
                    });
                });

            stArt()
                .then(clickTweetButton)
                .then(tweetBoxVisible)
                //.then(elapseSomeTime)
                //.then(clickTweetBox)
                //.then(elapseSomeTime)
                //.then(elapseSomeTime)
                .then(typeTweetBox1)
                //.then(typeTweetBox2)
                .then(addLinks)
                //.then(elapseSomeTime)
                .then(clickTweetSend)
                .then(function () {
                    chrome.runtime.sendMessage({
                        data: "doTwitterStuff_SENT"
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
