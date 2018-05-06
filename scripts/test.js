"use strict";
var wait = ms => new Promise((r, j) => setTimeout(r, ms));
var messageToSpread = generateIdea();
messageToSpread = ' ' + messageToSpread;
var myCachedObject = null;
var promiseCalled = 0;
var tries = 60; //60s should be enough to the tweet box dialog to show!

function getData() {
    return new Promise((resolve, reject) => {
        var b = document.getElementById('create-user') || false;
        if (b) {
            console.log('TBTN_SUCCESS');
            myCachedObject = b;
            resolve('TBTN_SUCCESS');
        } 
        else {
            console.log('TBTN_FAILED');
            reject('TBTN_FAILED');
        }
    });
}

function clickTweetButton() {
    return new Promise((resolve, reject) => {
    var b = myCachedObject;
    $(b).toggle("highlight", {color: "green"}, 1000);
    $(b).toggle("highlight", {color: "green"}, 1000);
    b = simulate(b,"click");
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
    if ( (--tries > 0) && (!$(c).is(':visible')) ) {
      setTimeout(function() {
        cb(resolve, reject);
      }, 5000);
    } else {
      if (!$(c).is(':visible')) {
        console.log('hidden');
        reject('TX_HIDDEN');
      } else {
        $(c).toggle("highlight", {color: "green"});
        $(c).toggle("highlight", {color: "green"});
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
        $(b).toggle("highlight", {color: "green"});
        $(b).toggle("highlight", {color: "green"});
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
        //$(b).sendkeys('{Enter}');
        $(b).focus().typetype('https://amnaldawla.wordpress.com');
        resolve('TX_LINKS');
    });
}

function clickTweetSend() {
    console.log('clickTweetSend');
    return new Promise((resolve, reject) => {
        var c = document.getElementsByClassName('ui-button ui-corner-all ui-widget')[2];
        myCachedObject = simulate(c, "click");
        resolve('TX_SEND');
    });
}


function elapseSomeTime() {    
    tries = Math.floor(Math.random() * 20) + 10;
  return new Promise(function cb(resolve, reject) {
    console.log(tries + ' remaining');
    if(--tries > 0) {
      if(tries == 2)
      {
        var c = document.getElementsByClassName('ui-button ui-corner-all ui-widget')[2];    
        $(c).toggle("highlight", {color: "green"});
        $(c).toggle("highlight", {color: "green"});    
      }
      setTimeout(function() {
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
    getData()
    .then(clickTweetButton)
    .then(tweetBoxVisible)
    .then(clickTweetBox)
    .then(typeTweetBox)
    .then(addLinks)
    .then(elapseSomeTime)
    .then(clickTweetSend)
    .catch(function (data) {
        console.log('CATCH:' + data);
    });
});

function begin() {
    console.log('at begin');
}


