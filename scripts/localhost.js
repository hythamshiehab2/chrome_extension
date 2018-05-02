//var T_tweetCalled = 0;
//var isLoggedIn = false;
const askQ = function () {
    console.log('asknig Q..');
    tweetButtonFound
        //.then(tweetButtonClicked)
        //.then(textBoxShown)
        .then(textBoxClicked)
        .then(typeText)
        //.then(tweetButtonSend)
        .then(fulfilled => console.log(fulfilled)) // fat arrow
        .catch(error => console.log('xxxxxxxxxxxxx')); // fat arrow
};

$(document).ready(function () {
    //T_tweet();
    console.log('will call askMom in 5s');
    setTimeout(askQ, 5000);
});

const typeText = function (tweetBox) {
    var typed = false;
    var txt = generateIdea();
    var t = tweetBox;
    console.log('will type:' + txt + 'in ' + t);
    $(t).typetype(txt, {
        e: 0.04, // error rate. (use e=0 for perfect typing)
        t: 100, // interval between keypresses
        keypress: function () {
            // called after every keypress (this may be an erroneous keypress!)
            console.log('typeing...');
            //return Promise.pending();
        },
        callback: function () {
            // the `this` keyword is bound to the particular element.
            console.log('TYPETYPE!');
            //return Promise.resolve('TYPE_DONE');
            setTimeout(tweetButtonSend, 2000);
        }
    });
};

const tweetButtonFound = new Promise((resolve, reject) => {
    var b = document.getElementById('comment');
    var l = b;
    if (b) {
        console.log(b);
        resolve(l);
    } else {
        reject(null);
    }
});

const tweetButtonClicked = function (b) {
    var c = document.getElementById('comment');
    console.log(c);
    return Promise.resolve(c);
};

const textBoxShown = function (c) {
    var d = document.getElementById('comment');
    simulate(d, "click");
    //c.click();
    return Promise.resolve(d);
};

const textBoxClicked = function () {
    var t = document.getElementById('comment');
    simulate(t, "mousedown");
    console.log(t);
    return Promise.resolve(t);
};

const tweetButtonSend = function (msg) {
    console.log(msg);
    console.log(msg);
    console.log(msg);
    var btn = document.getElementById('submit');
    simulate(btn, "click");
    btn.click();
    return Promise.resolve(btn);
};
// call our promise


function injectStuff() {
    var a = chrome.extension.getURL("css/myactivetab.css");
    //$('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo("head");
    //$('<div id="elmotasha3eb"></div>').appendTo("body");
}

function generateIdea() {
    var ideas = [
  "قال لي أفّاك يوما، كدب مساوي ولا صدق منعكش\nجدلت المقادير وضفرت، فتنعكش الكدب المساوي وبقي الصدق صدقا\n#وضع_الناموسيه",
    "الكلام المكتوب في المدونة دي عجيب جدا، لو كدب يبقى اللي كتبه يتحاكم علنا، ولو صدق، يبقى الأمن الوطني وغيره لازم يتحاكموا",
    "هو احنا مش هانخلص من القرف ده!؟، لازم يتحط قانون واضح ويتفعل مش على الارفف، ان اي موظف رسمي يكدب لازم يتعاقب عقاب رادع، والا مش هايبقى فيه حاجه اسمها نظام اصلا",
    "يعني جزيرة برمودا ماطلعتش بتغرق سفن ولا طيارات، طلعت بتغرق فلوس وبتغسلها وملجأ لغسيل الاموال والحسابات السريه، وكمان بعلم الأجهزة الأمنيه اللي بتحب تظهر نفسها على انها رفيعه المستوى و.. نزيهه عن المصلحة القذرة",
  ];
    var randomArrayPosition = Math.floor(Math.random() * ideas.length);
    var idea = ideas[randomArrayPosition];
    return idea;
}

function typeAsHuman(elem, ch) {
    $(elem).sendkeys(ch);
}

function isLoggedInCheck() {
    var l = null;
    const promise = new Promise((resolve, reject) => {
        var x = document.getElementById('global-new-tweet-button');
        if (x) {
            console.log(x);
            l = x;
            isLoggedIn = true;
            resolve(x);
        } else {
            x = null;
            console.log('not found');
            isLoggedIn = false;
            reject(x);
        }
    });
    //    promise.then((l) => {
    //        console.log('PROMISE SUCCESSED:' + l);
    //        isLoggedIn = true;
    //        //return l;
    //    }, (error) => {
    //        console.log('PROMISE FAILED:' + l);
    //        isLoggedIn = false;
    //    });
    //return l;
}

function T_follow() {
    //    document.getElementsByClassName('user-actions-follow-button')[0].click();
    document.getElementsByClassName('user-actions-follow-button js-follow-btn follow-button')[0].click();
}

function T_moment() {}

function get_Ta() {
    var b = document.getElementById('global-new-tweet-button') || false;
    if (!b) {
        setTimeout(get_Ta, 2000);
    } else {
        console.log('I got a:' + b);
        return b;
    }
}

function get_Tb() {
    var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
    if (!b) {
        setTimeout(get_Tb, 2000);
    } else {
        console.log('I got b:' + b);
        return b;
    }
}

function get_Tc() {
    var c = document.getElementsByClassName('SendTweetsButton')[0];
    if (!c) {
        setTimeout(get_Tc, 2000);
    } else {
        console.log('I got c:' + c);
        console.log(c);
        return c;
    }
}
