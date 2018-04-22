/*
by Hytham Shiehab <hytham.shiehab.2@gmail.com>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/
var isFBisLiked = false;
var msgFlow = [];
var msgPipe = ['doFacebookStuff', 'doWordpressStuff', 'doTwitterStuff'];
// We should also check for any captcha!
// keep an eye (counter) for captcha per session(s)
// so we can mitigate the user account being locked up
//
// <img class="img" src="https://www.facebook.com/captcha/tfbimage.php?captcha_challenge_code=1523901580-89a13273a09b7f35e763c3ca40ae8408&amp;captcha_challenge_hash=AZmRaKxJX7tUo4zsn6ANaEDoCoZXYa0lf1wrhX6GJOXS4PdiTrbBwESIDVl5j1P3pL4vWA_otf_1bl-GM6knG-LZ2fOaiQZY9qIZkeknVJj_VIxk4V3MPu4bhNlpQtIAy7GFRciON_OIXca03F53lv4fPSORBSZuNQlu_aiWtl5mvbL504bd31gmZXK1USWPVb8" alt="Hit reload on your browser to refresh this page if this image doesn't load.">
//function checkMessage(message) {
//    return msgFlow.find;
//}

//function myFunction() {
//    document.getElementById("demo").innerHTML = ages.find(checkAdult);
//}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function ShareSomething() {
    console.log('will share something');
}

function get_b() {
    b = document.getElementById('global-new-tweet-button') || false;
    return b;
}

function T_tweet() {
    console.log('T_tweet');
    //    var b = document.getElementById('global-new-tweet-button') || false;
    var b = document.getElementById('global-new-tweet-button') || false;
    //    if (b == false) {
    //        console.log('failed to getElementByClassName, retrying after 2s');
    //        setTimeout(get_b(), 2000);
    //    }
    b.click();
    console.log('button clicked');
    var t = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;;
    //    while (!t) {
    //        if (!t) {
    //            console.log('failed to getElementByClassName, retrying after 2s');
    //            setTimeout(function () {
    //                t = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
    //            }, 2000);
    //        }
    //    }
    //
    t.innerText = 'إذا عدتم عدنا';
    sleep(2000);
    simulate(t, "mousedown");
    sleep(2000);
    var c = document.getElementsByClassName('SendTweetsButton')[0] || false;
    //    while (!c) {
    //        if (!c) {
    //            console.log('failed to getElementByClassName, retrying after 2s');
    //            setTimeout(function () {
    //                c = document.getElementsByClassName('SendTweetsButton')[0] || false;
    //            }, 2000);
    //        }
    //    }
    c.click();
    sleep(2000);
    console.log('tweeted!');
}

function T_follow() {
    //    document.getElementsByClassName('user-actions-follow-button')[0].click();
    document.getElementsByClassName('user-actions-follow-button js-follow-btn follow-button')[0].click();
}

function T_moment() {

}

function postOnFB() {
    // on the user profile page
    // this will get the '...' element, which by clicking, open the new textarea
    // for typing the new post
    // 1) document.getElementsByClassName('navigationFocus')[1].click()
    // 2)

    // document.getElementsByClassName('_5xmp')[2].click()
    //getElementByXpath('//*[@id="u_fetchstream_5_k"]/div/div[3]/div/div[2]/div/button').click()
    //document.getElementsByClassName('share_action_link')[0].click()
    //getElementByXpath('//*[@id="u_y_0"]/div/ul/li[1]/a').click()
    //getElementByXpath('//*[@id="js_1ac"]/div/div/div[4]/div[2]/div/div[2]/div/div[2]/button[2]').click()
    //getElementByXpath('//*[@id="js_kp"]/div/div/div[4]/div[2]/div/div[2]/div/div[2]/button[2]').click()
    //
}

function checkFBisLoggedIn() {
    console.log('content:checkFBisLoggedIn');
    var login_form_exists = document.getElementById('login_form') || 0;
    console.log(login_form_exists);
    if (login_form_exists) {
        console.log('user is NOT logged in!');
    } else {
        // user is logged in
        console.log('user is logged in');
        console.log('continue');
        return 1;
    }
    return 0;
}

function checkFBPageIsLiked() {
    console.log('content:checkFBPageIsLiked');
    var likedButton = document.getElementsByClassName('likedButton')[0];
    if (!likedButton) {
        // not liked!?
        console.log('content:will like!');
        var likeButton = document.getElementsByClassName('likeButton')[0];
        if (!likeButton) {
            console.log('content:now what!? didtn found the like/liked buttons!');
        } else {
            likeButton.click();
            console.log('content:this will Do!');
            isFBisLiked = true;
        }
    } else {
        console.log('content:already LIKED!');
        console.log('content:now will start!');
        isFBisLiked = true;
    }
    setInterval(theHypered, 30000);

}

function checkMessageFlow() {
    // this will keep track of the flow of the procedures, acting as the officer of Elmoror
    // Till now, I have no IDEA how!
    //
    console.log('checkMessageFlow');

    //
    //    if (msgFlow.indexOf('doWordpressStuff') === -1) {
    //        msgFlow.push('doWordpressStuff');
    //        chrome.runtime.sendMessage({
    //            data: "doWordpressStuff"
    //        }, function (response) {
    //            console.log(response);
    //        });
    //    } else {
    //        chrome.runtime.sendMessage({
    //            data: "doTwitterStuff"
    //        }, function (response) {
    //            console.log(response);
    //        });
    //    }
}

function theHypered() {
    console.log('theHypered is checking...');
    chrome.storage.local.get(['rocknroll'], function (result) {
        console.log('content:my rocknroll is ' + result.rocknroll);
        rr = result.rocknroll;
    });
    console.log('content:the RR:');
    console.log(rr);

    if (rr == 'true') {
        console.log('theHypered will execute.');
        checkMessageFlow();
    } else {
        console.log('theHypered is exiting...');
        return;
    }
}

function generateIdea() {
    var ideas = ["idea1",
    "idea2",
    "idea3",
    "idea4",
    "idea5",
    "idea6",
    "idea7"
  ]
    var randomArrayPosition = Math.floor(Math.random() * ideas.length);
    var idea = ideas[randomArrayPosition];
    return idea;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request);
    //if (request.greeting == "hello")

    //    if (request.data === "doWordpressStuff") {
    //        console.log('I got hello!');
    //        sendResponse({
    //            farewell: "goodbye"
    //        });
    //    }
    console.log('content.js:' + data);
    if (data === 'doFacebookStuff'); {
        checkFBisLoggedIn();
        checkFBPageIsLiked();
        sendResponse('doFacebookStuff_DONE');
        msgFlow.push('doFacebookStuff_DONE');
    }
    if (data === 'doWordpressStuff') {
        ShareSomething();
    }
    if (data === 'doTwitterStuff') {
        T_tweet();
        msgFlow.push('doTwitterStuff_DONE');
    }


    console.log('waiting load to complete');

    $(document).ready(function () {
        //        console.log('content:data sent:' + data);
        //        console.log('content:document is ready!');
        //        if (data == 'start') {}
        //        if (data == "startRR") {
        //            console.log('StarRR');
        //        }
        //        if (data == "startRRR") {
        //            console.log('StartRRR');
        //        }
    });
});
