"use strict";
var messageToSpread = generateIdea();
var link = getRandomLink();
//messageToSpread = ' ' + messageToSpread;
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
    var e = document.getElementById('elnamosia');
    var d = document.createElement("div");
    var c = document.createElement("div");

    d.id = "myCounter";
    d.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;";
    //button.addEventListener("click", doSomething, false);
    e.appendChild(d);
    //c.classList.add("alert");
    //c.classList.add("alert-success");

    c.style = "font-size: 120%;font-weight: bold;position: fixed;left: 0;bottom: 0;width: 100%;padding-right:10px;padding-bottom:10px;text-decoration: none !important;font-size: medium !important;backgruond-color:red;float:right;";
    e.appendChild(c);
    var k = document.getElementById("myStartNowButton");
    k.style = "float:right;visibility: visible;";
    c.appendChild(k);
    // Set the date we're counting down to
    var timeleft = s;
    var downloadTimer = setInterval(function () {
        timeleft--;
        d.innerHTML = ' هاصحى كمان ' + timeleft + ' ثانيه ';
        if (timeleft <= 0)
            clearInterval(downloadTimer);
    }, 1000);
}

function superVisor() {
    var myTries = 1000;
    return new Promise(function cb(resolve, reject) {
        var c = document.getElementsByClassName('ui-dialog-title')[0];
        console.log(myTries + ' remaining');
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

/*
function stArt() {
    console.log('stArtEd:' + stArtEd);
    stArtEd++;
    return new Promise((resolve, reject) => {
        var b = document.getElementById('create-user') || false;
        if (b) {
            console.log('TBTN_SUCCESS');
            myCachedObject = b;
            resolve('TBTN_SUCCESS');
        } else {
            console.log('TBTN_FAILED');
            reject('TBTN_FAILED');
        }
    });
}
*/

function stArt() {
    var myTries = 60;
    return new Promise(function cb(resolve, reject) {
        var c = document.getElementById('testId');
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
    return new Promise((resolve, reject) => {
        var b = document.getElementById('create-user') || false;
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

function tweetBoxVisible() {
    return new Promise(function cb(resolve, reject) {
        var c = document.getElementsByClassName('ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable ui-resizable')[0];
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

function clickTweetBox() {
    console.log('clickTweetBox');
    return new Promise((resolve, reject) => {
        var b = document.getElementById('comment');
        //highlightObject(b);
        myCachedObject = simulate(b, "mousedown");
        resolve('TX_CLICKED');
    });
}

function typeTweetBox() {
    return new Promise((resolve, reject) => {
        console.log('typeTweetBox');
        var typed = false;
        var t = myCachedObject;
        console.log('will type:' + messageToSpread + 'in ' + t);
        $(t).focus().typetype(messageToSpread, {
            e: 0.04, // error rate. (use e=0 for perfect typing)
            t: 100, // interval between keypresses
            keypress: function () {
                // called after every keypress (this may be an erroneous keypress!)
                console.log('typeing...')
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
        var b = document.getElementById('comment');
        $(b).focus().sendkeys('{Enter}');
        $(b).focus().sendkeys(link);
        resolve('TX_LINKS');
    });
}

function clickTweetSend() {
    console.log('clickTweetSend');
    return new Promise((resolve, reject) => {
        var c = document.getElementsByClassName('ui-button ui-corner-all ui-widget')[3];
        myCachedObject = simulate(c, "click");
        resolve('TX_SEND');
    });
}

function elapseSomeTime() {
    //tries = Math.floor(Math.random() * 20) + 10;
    tries = 10;
    return new Promise(function cb(resolve, reject) {
        console.log(tries + ' remaining');
        if (--tries > 0) {
            if (tries == 2) {
                var c = document.getElementsByClassName('ui-button ui-corner-all ui-widget')[3];
                //highlightObject(c);
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
                        data: "doLocalhostNet_DONE"
                    }, function (response) {
                        console.log("from test.js:" + response);
                        console.log(response);
                    });
                }
            })
            .catch(function (data) {
                var error = "doLocalhostNet_ERROR:" + data;
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
            .then(clickTweetBox)
            .then(typeTweetBox)
            .then(addLinks)
            .then(elapseSomeTime)
            .then(clickTweetSend)
            .then(function () {
                chrome.runtime.sendMessage({
                    data: "doLocalhostNet_SENT"
                }, function (response) {
                    console.log(response);
                    console.log("from test.js:" + response);
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
