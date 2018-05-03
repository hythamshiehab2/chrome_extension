function roll() {
    const tttt = new Promise(function (resolve, reject) {
        console.log('here');
        var gotIt = false;
        var b = document.getElementById('global-new-tweet-button');
        if (!b) {
            console.log('not found yet!');
            gotIt = false;
            reject('NOT_LOGGED_IN');
        } else {
            gotIt = true;
            resolve(b);
        }
    });
    tttt.then(console.log('done'));
}
//const askHytham = function () {
//    console.log('askHytham ..');
//    tweetButtonFound
//        //.then(tweetButtonClicked, (error) => errorHandler(error))
//        .then(tweetButtonClicked)
//        .catch(error => errorHandler(error));
//    //.then(textBoxShown)
//    //.then(textBoxClicked)
//    //.then(typeText)
//    //.then(tweetButtonSend)
//    //.then(fulfilled => console.log(fulfilled)) // fat arrow
//    //.catch(error => console.log('xxxxxxxxxxxxx')); // fat arrow
//    //.catch(error => errorHandler(error));
//};

//$(document).ready(function () {
//    //jQuery(document).ready(function () {
//    console.log('read');
//    setTimeout(function () {
//        begin();
//    }, 20000);
//});

//window.addEventListener("load", begin);


//$(document).ready(function () {
//    //T_tweet();
//    console.log('will call begin in 15s');
//    //setTimeout(begin, 15000);
//    //begin();
//});
function begin() {
    console.log('will begin');
    //goodToGo();
    //setTimeout(roll, 30000);
    roll();
}

function errorHandler(error) {
    console.log('ERROR' + error);
}

function goodToGo() {
    var btxyz = document.getElementById('global-new-tweet-button');
    if (!btxyz) {
        console.log('not to go yet');
        setTimeout(goodToGo, 1000);
    } else {
        consoel.log('goot 2 go');
        //askHytham();
    }
}
//const tweetButtonFound = new Promise((resolve, reject) => {
//    var b = document.getElementById('global-new-tweet-button');
//    console.log(b);
//    var l = b;
//    if (b) {
//        console.log(b);
//        resolve(l);
//    } else {
//        //reject(null);
//        reject(Error('NOT_FOUND'));
//    }
//});

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
            console.log('typeing...')
        },
        callback: function () {
            // the `this` keyword is bound to the particular element.
            console.log('TYPETYPE!');
            //return Promise.resolve('done!');
            setTimeout(tweetButtonSend, 2000);
        }
    });
};

const tweetButtonClicked = function (tweetButton) {
    console.log('I got tweetButton!');
    console.log(tweetButton);
    var c = simulate(tweetButton, "click");
    return Promise.resolve(c);
};

const textBoxShown = function () {
    var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
    return Promise.resolve(b);
};

const textBoxClicked = function (textBox) {
    simulate(textBox, "mousedown");
    return Promise.resolve(textBox);
};

const tweetButtonSend = function (msg) {
    console.log(msg);
    console.log(msg);
    console.log(msg);
    console.log(msg);
    var c = document.getElementsByClassName('SendTweetsButton')[0];
    simulate(c, "click");
    return Promise.resolve("clicked!");
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

function T_follow() {
    //    document.getElementsByClassName('user-actions-follow-button')[0].click();
    document.getElementsByClassName('user-actions-follow-button js-follow-btn follow-button')[0].click();
}

function T_moment() {}
