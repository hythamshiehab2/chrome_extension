"use strict";
var wait = ms => new Promise((r, j) => setTimeout(r, ms));
var messageToSpread = generateIdea();
messageToSpread = ' ' + messageToSpread;
var myCachedObject = null;
var promiseCalled = 0;



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

function callItAgain() {
    console.log('callItAgain');
    myPromise
        .then(function (data) {
            console.log(data); // "Yeah !"
            console.log("Final fulfilled:", myPromise.isFulfilled()); //true
            console.log("Final rejected:", myPromise.isRejected()); //false
            console.log("Final pending:", myPromise.isPending()); //false
        })
        .catch(function (data) {
            console.log(data);
            if (data === 'negative') {
                console.log('will call it again');
                setTimeout(callItAgain, 5000);
            }
        });
}

$(document).ready(function () {
var originalPromise = new Promise(function (resolve, reject) {
    promiseCalled++;
    console.log('originalPromise');
    var b = null;
    //setTimeout(function() {
    b = document.getElementById('create-user') || false;
    if (b) {
        var c = b;
        console.log(b);
        myCachedObject = b;
        resolve(c);
    } else {
        console.log('negative');
        reject('TWEET_BUTTON');
    }
    //}, 10000);
});

var myPromise = MakeQuerablePromise(originalPromise);

var dummy = new Promise(function (resolve, reject) {
    console.log('dummy step');
    console.log('promiseCalled:' + promiseCalled);
    return Promise.resolve('dummy step called');
});

var clickTweetButton = new Promise(function (resolve, reject) {
    console.log('clickTweetButton');
    console.log('promiseCalled:' + promiseCalled);    
    //b = document.getElementById('global-new-tweet-button') || false;
    var b = myCachedObject;
    b = simulate(b,"click");
    return Promise.resolve(b);
});

var clickTweetBoxMouseDown = new Promise(function (resolve, reject) {
    console.log('clickTweetBox');
    console.log('promiseCalled:' + promiseCalled);  
    var b = document.getElementsByClassName('ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable ui-resizable')[0];      
    setTimeout(function() {
        if ($(b).is(':visible'))
        {   
            console.log('tweet box found'); 
            myCachedObject = b;
            console.log(b);
            simulate(b, "mousedown");
            return Promise.resolve(b);
        }
        else
        {
            console.log('NOT FOUND YET!');
            return Promise.reject('NOT_VISIBLE');
        }
        /*
        else
        {
            console.log('TWEET_BOX');
            return Promise.reject('TWEET_BOX');
        }
        */
    }, 1000);
});
clickTweetBoxMouseDown
.then(dummy)
.catch(function (data) {
    console.log('CATCHED_');
});

var clickTweetBoxClick = new Promise(function (resolve, reject) {
    console.log('clickTweetBox');
    console.log('promiseCalled:' + promiseCalled);    
    var b = document.getElementById('comment');
    if(b)
    {
        console.log(b);
        myCachedObject = b;
        simulate(b, "click");
        return Promise.resolve(b);
    }
});

var typeText = new Promise(function (resolve, reject) {
    console.log('typeText');
    console.log('promiseCalled:' + promiseCalled);    
    var typed = false;
    var t = myCachedObject;
    console.log('will type:' + messageToSpread + 'in ' + t);
    $(t).focus().typetype(messageToSpread, {
        e: 0.04, // error rate. (use e=0 for perfect typing)
        t: 100, // interval between keypresses
        keypress: function () {
            // called after every keypress (this may be an erroneous keypress!)
            console.log('typeing...')
            //return Promise.pending();
        },
        callback: function () {
            // the `this` keyword is bound to the particular element.
            console.log('TYPETYPE!');
            $(t).sendkeys('{Enter}');
            /*
            var c = document.getElementsByClassName('SendTweetsButton')[0];
            console.log(c);
            setTimeout(function() {
                simulate(c, "click");
            }, 2000);
            */
            return Promise.resolve('done!');
        }
    });
});

var typeLinks = new Promise(function (resolve, reject) {
    console.log('typeText');
    console.log('promiseCalled:' + promiseCalled);    
    var typed = false;
    //var t = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1];
    var t = myCachedObject;
    $(t).sendkeys('{Enter}');
    $(t).typetype('https://amnaldawla.wordpress.com');
    $(t).sendkeys('{Enter}');
    $(t).typetype('#وضع_الناموسيه');
    return Promise.resolve('done!');
});

var clickTweetSend = new Promise(function (resolve, reject) {
    console.log('clickTweetSend');
    console.log('promiseCalled:' + promiseCalled);    
    var c = document.getElementsByClassName('ui-button ui-corner-all ui-widget')[2];
    setTimeout(function() {
        simulate(c, "click");
    }, 2000);
    return Promise.resolve(c);
});

    //setTimeout(begin, 30000);
    //begin();
    //getData();
    console.log('document ready');
    //var myPromise = MakeQuerablePromise(originalPromise);
    console.log("Initial fulfilled:", myPromise.isFulfilled()); //false
    console.log("Initial rejected:", myPromise.isRejected()); //false
    console.log("Initial pending:", myPromise.isPending()); //true
    /*
    myPromise
        .then(dummy)
        //.then(clickTweetButton)
        //.then(clickTweetBoxMouseDown)
        //.then(typeText)
        //.then(clickTweetBoxClick)
        //.then(typeLinks)
        //.then(clickTweetSend)
        /*
        .then(function(data){
            console.log(data); // "Yeah !"
            console.log("Final fulfilled:", myPromise.isFulfilled());//true
            console.log("Final rejected:", myPromise.isRejected());//false
            console.log("Final pending:", myPromise.isPending());//false
        })
        .catch(function (data) {
            var status = myPromise.isPendnig();
            if (!status) {
                //callItAgain();
            }
            console.log(data);
            if (data === 'negative') {
                //callItAgain();
            }
        });
    */
});

function begin() {
    console.log('at begin');
    //wait(30000);
    //test();
    //var x = getData();
}

function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function (v) {
            isFulfilled = true;
            isPending = false;
            return v;
        },
        function (e) {
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    result.isFulfilled = function () {
        return isFulfilled;
    };
    result.isPending = function () {
        return isPending;
    };
    result.isRejected = function () {
        return isRejected;
    };
    return result;
}

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
