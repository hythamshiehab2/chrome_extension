var T_tweetCalled = 0;
var isLoggedIn = false;

$(document).ready(function () {
    T_tweet();
});

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

function T_tweet() {
    if (T_tweetCalled)
        return;
    T_tweetCalled++;
    var typed = false;
    console.log('T_tweet');
    //    const promise = getPromise('some url here');
    //
    //    promise.then((result) => {
    //        //we have our result here
    //        return getPromise(result); //return a promise here again
    //    }).then((result) => {
    //        //handle the final result
    //    });
    const isLoggedInChecked = isLoggedInCheck();

    isLoggedInChecked.then((result) => {
        console.log('result' + result);
        //we have our result here
        //return getPromise(result); //return a promise here again
        //    }).then((result) => {
        //        //handle the final result
    });
    //injectStuff();
    // first check if we are logged in
    //var pS = wait(10000);
    //var kS = () => console.log('will wait 10s');
    //pS.then(kS);
    console.log(isLoggedIn);
    if (isLoggedIn) {
        b = get_Ta();
        b.click();
        console.log('button clicked');
        t = get_Tb();
        //t.innerText = 'إذا عدتم عدنا';
        simulate(t, "mousedown");
        var pT = wait(100) // prom, is a promise
        var sT = () => typeText(t);
        //typed = typeText(t);
        pT.then(sT);

        c = get_Tc();
        var prom = wait(2000) // prom, is a promise
        var showdone = () => simulate(c, "click");
        prom.then(showdone);
        console.log('tweeted!');
        resetState();
        chrome.runtime.sendMessage({
            data: "doTwitterStuff_DONE"
        }, function (response) {
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
            console.log(response);
        });
    } else {
        console.log('NOT LOGGED IN!?');
        chrome.runtime.sendMessage({
            data: "alarmTwitterNotLoggedIn"
        })
    }
}

function typeText(t) {
    var typed = false;
    var txt = generateIdea();
    const promise = new Promise((resolve, reject) => {
        $(t).typetype(txt, {
            e: 0.04, // error rate. (use e=0 for perfect typing)
            t: 100, // interval between keypresses
            keypress: function () {
                // called after every keypress (this may be an erroneous keypress!)
            },
            callback: function () {
                // the `this` keyword is bound to the particular element.
                typed = true;
                console.log('TYPETYPE!');
            }
        });
        if (typed) {
            resolve(typed);
        } else {
            reject(typed = false);
        }
    });
    promise.then((typed) => {
        console.log('PROMISE SUCCESSED:' + typed);
        //return l;
    }, (error) => {
        console.log('PROMISE FAILED:' + typed);
        //return 0;
    });
    return typed;
}

function isLoggedInCheck() {
    var l = null;
    const promise = new Promise((resolve, reject) => {
        var x = document.getElementById('global-new-tweet-button');
        if (x) {
            console.log(x);
            l = x;
            isLoggedIn = true;
            resolve(l);
        } else {
            console.log('not found');
            isLoggedIn = false;
            reject(x = null);
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
