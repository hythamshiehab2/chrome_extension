"use strict";
var messageToSpread = generateIdea();
var link = getRandomLink();
var myCachedObject = null;
var promiseCalled = 0;
var tries = 60; //60s should be enough to the tweet box dialog to show!
var stArtEd = 0;
var typing = false;
//$.noConflict();

function doItNow() {
    chrome.runtime.sendMessage({
        data: "doItNow_REQUEST"
    }, function (response) {});
}

function nextStep(t) {
    var s = t / 1000;
    var m = s / 60;
    var e = document.getElementById('elnamosia');
    var d = document.createElement("div");
    var c = document.createElement("div");

    d.id = "myCounter";
    d.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;";
    e.appendChild(d);
    c.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;float:right;";
    e.appendChild(c);
    var k = document.getElementById("myStartNowButton");
    k.style = "float:right;visibility: visible;";
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
    var myTries = 1000;
    return new Promise(function cb(resolve, reject) {
        var c = document.getElementsByClassName('alert alert-success')[0];
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
    if (stArtEd)
        return;
    stArtEd++;
    return new Promise(function cb(resolve, reject) {
        var theFrame = document.getElementsByTagName("iframe")[0];
        var theFrameDocument;
        var c;
        if (theFrame) {
            theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
            if (theFrameDocument) {
                c = theFrameDocument.getElementsByTagName('p')[0];
            }
        }
        console.log(myTries + ' remaining');
        if (
            (--myTries > 0) &&
            ((theFrame == null) || (theFrameDocument == null))) {
            setTimeout(function () {
                cb(resolve, reject);
            }, 5000);
        } else {
            if (!c) {
                console.log('hidden');
                reject('TBTN_FAILED');
            } else {
                //highlightObject(c);
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

/*
function clickTweetButton() {
    return new Promise((resolve, reject) => {
        var b = document.getElementById('global-new-tweet-button');
        //highlightObject(b);
        b = simulate(b, "click");
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
*/

function tweetBoxVisible() {
    return new Promise(function cb(resolve, reject) {
        //var c = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
        var c = document.getElementById('Tweetstorm-dialog-dialog');
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
                console.log('visible');
                resolve('TX_VISIBLE');
            }
        }
    });
}

function sendKeyStrokes() {
    console.log('sendKeyStrokes..');
    return new Promise((resolve, reject) => {
        //var b = myCachedObject;
        //var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
        var theFrame = document.getElementsByTagName("iframe")[0];
        var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
        var p = theFrameDocument.getElementsByTagName('p')[0];
        $(p).focus().sendkeys('"');
        $(p).sendkeys('{enter}');
        $(p).focus().sendkeys('{backspace}');
        $(p).sendkeys('{backspace}');
        $(p).sendkeys('x');
        $(p).sendkeys('{enter}');
        $(p).sendkeys('y');
        $(p).sendkeys('{enter}');
        $(p).sendkeys('z');
        $(p).sendkeys('{enter}');
        $(p).sendkeys('{selectall}');
        $(p).focus().sendkeys('{del}');
        //$(b).sendkeys('{Enter}');
        resolve('TX_KEYSTROKES');
    });
}

function clickTweetBox() {
    console.log('clickTweetBox:mousedown');
    return new Promise((resolve, reject) => {
        var theFrame = document.getElementsByTagName("iframe")[0];
        var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
        var p = theFrameDocument.getElementsByTagName('p')[0];
        myCachedObject = simulate(p, "mousedown");
        myCachedObject = simulate(p, "click");
        console.log(myCachedObject);
        myCachedObject = simulate(p, "mouseup");
        //myCachedObject = simulate(b, "click");
        resolve('TX_CLICKED');
    });
}

function typeTweetBox() {
    return new Promise((resolve, reject) => {
        console.log('typeTweetBox');
        if (typing)
            return;
        typing = true;
        //simulate(myCachedObject, "mouseup");
        //var theFrame = document.getElementsByTagName("iframe")[0];
        //var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
        //var p = theFrameDocument.getElementsByTagName('p')[0];

        //$(p).focus().typetype(messageToSpread);
        //var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
        //b = simulate(b, "mouseup");
        //var t = myCachedObject;
        //t = simulate(t, "click");
        //var t = b;
        var p = myCachedObject.parentNode;
        //var pc = p.getElementsByTagName('p')[0];
        var br = myCachedObject.getElementsByTagName('br')[0];
        //myCachedObject.removeChild(br);
        //var b = document.createElement('br');

        //myCachedObject.innerHTML = '';
        //var c = document.createElement('p');
        //p.appendChild(c);
        //        c.innerHTML = '<br>';
        //        p.appendChild(c);
        //c.a
        //var br = myCachedObject.getElementsByTagName('br')[0];
        console.log('will type:' + messageToSpread + 'in ' + myCachedObject);
        //resolve('TX_TYPED');
        //$(myCachedObject).focus().sendkeys(messageToSpread);
        //resolve('TX_TYPED');
        //$(myCachedObject).focus().sendkeys('{Enter}');
        var cc = 0;
        $(myCachedObject).focus().typetype(messageToSpread, {
            e: 0.04, // error rate. (use e=0 for perfect typing)
            t: 100, // interval between keypresses
            keypress: function () {
                console.log(p.innerHTML);
                //                if (cc)
                //                    return;
                //                cc++;
                //myCachedObject.innerHTML += "d";
                //myCachedObject.appendChild(b);

                // called after every keypress (this may be an erroneous keypress!)
                //console.log('typeing...')
                //myCachedObject.parentNode.removeChild('br');
            },
            callback: function () {
                var e = document.getElementById('elnamosia');
                simulate(e, "click", {
                    pointerX: 30,
                    ppointerY: 30
                });
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
        var theFrame = document.getElementsByTagName("iframe")[0];
        var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
        var p = theFrameDocument.getElementsByTagName('p')[0];
        $(p).focus().sendkeys('{enter}');
        //$(b).sendkeys('{Enter}');
        $(p).focus().sendkeys(link);
        resolve('TX_LINKS');
    });
}

function clickTweetSend() {
    console.log('clickTweetSend');
    return new Promise((resolve, reject) => {
        var c = document.getElementsByName('submit')[1];
        myCachedObject = simulate(c, "click");
        //var t = c.getClientRects()[0]
        resolve('TX_SEND');
    });
}

function elapseSomeTime() {
    //tries = Math.floor(Math.random() * 20) + 10;
    tries = 5;
    return new Promise(function cb(resolve, reject) {
        console.log(tries + ' remaining');
        if (--tries > 0) {
            if (tries == 2) {
                console.log('lagging...');
            }
            setTimeout(function () {
                cb(resolve, reject);
            }, 1000);
        } else {
            resolve('TIME_ELAPSED');
        }
    });
}

function generateIdea() {
    var ideas = [
  "قال لي أفّاك يوما، كدب مساوي ولا صدق منعكش\nجدلت المقادير وضفرت، فتنعكش الكدب المساوي وبقي الصدق صدقا\n#وضع_الناموسيه",
    "الكلام المكتوب في المدونة دي عجيب جدا، لو كدب يبقى اللي كتبه يتحاكم علنا، ولو صدق، يبقى الأمن الوطني وغيره لازم يتحاكموا",
    "هو احنا مش هانخلص من القرف ده!؟، لازم يتحط قانون واضح ويتفعل مش على الارفف، ان اي موظف رسمي يكدب لازم يتعاقب عقاب رادع، والا مش هايبقى فيه حاجه اسمها نظام اصلا",
    "يعني جزيرة برمودا ماطلعتش بتغرق سفن ولا طيارات، طلعت بتغرق فلوس وبتغسلها وملجأ لغسيل الاموال والحسابات السريه، وكمان بعلم الأجهزة الأمنيه اللي بتحب تظهر نفسها على انها رفيعه المستوى و.. نزيهه عن المصلحة القذرة",
    "المدونة تتحدث عن ذراع الأمن القومي وكفّها ألأمن الوطني وأصابعها الدّاخليه، هل من المحتمل أن يتحدث رجل بهذا الوضوح دون أن يكون ما يقوله حقيقي وماخفي أعظم!؟",
  ];
    var randomArrayPosition = Math.floor(Math.random() * ideas.length);
    var idea = ideas[randomArrayPosition];
    return idea;
}

$(document).ready(function () {
    //$(document).ready(function($){
    console.log('Am I ready!?');

    var e = document.getElementById('elnamosia');
    var button = document.createElement("button");

    function doSomething() {
        alert('boo');
    }

    function doItNow() {
        chrome.runtime.sendMessage("mpnhfhekacdacnjkegjdmfgjfkckacea", {
            data: "doItNow_REQUEST"
        }, function (response) {
            console.log(response);
        });
    }

    button.id = "myStartNowButton";
    //button.disabled = true;
    //button.style = "color:gray;"
    button.style = "visibility: hidden;";
    button.textContent = "دوّرها";
    button.addEventListener("click", doItNow, false);

    e.appendChild(button);

    if (!stArtEd) {
        superVisor()
            .then(function (data) {
                console.log(data);
                if (data == 'CONF_VISIBLE') {
                    chrome.runtime.sendMessage({
                        data: "doMaharaStuff_DONE"
                    }, function (response) {
                        console.log("from mahara.js:" + response);
                        console.log(response);
                    });
                }
            })
            .catch(function (data) {
                var error = "doMaharaStuff_ERROR:" + data;
                chrome.runtime.sendMessage({
                    data: error
                }, function (response) {
                    console.log("from mahara.js:" + response);
                    console.log(response);
                });
            });

        stArt()
            //.then(clickTweetButton)
            //.then(tweetBoxVisible)
            .then(clickTweetBox)
            .then(elapseSomeTime)
            .then(sendKeyStrokes)
            .then(elapseSomeTime)
            .then(typeTweetBox)
            .then(addLinks)
            .then(elapseSomeTime)
            .then(clickTweetSend)
            .then(function () {
                chrome.runtime.sendMessage({
                    data: "doMahara_SENT"
                }, function (response) {
                    console.log(response);
                    console.log("from mahara.js:" + response);
                    console.log(response.message);
                    console.log(response.next);
                    nextStep(response.next);
                });
            })
            .catch(function (data) {
                console.log('CATCH:' + data);
            });
    }
});

function begin() {
    console.log('at begin');
}
