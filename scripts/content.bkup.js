/* CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES */

/* this never fired! */
// document.addEventListener('DOMContentLoaded', function(dcle) {
//   console.log('CONTENT:document is loaded');
// });

/*
function sendMsgFlowResponse(t) {
    console.log('sendMsgFlowResponse:' + t);
    var msg = "CHECK_MSG_FLOW_RESPONSE:" + t;
    chrome.runtime.sendMessage({
        data: msg
        // }, function(response) {
        //   console.log(response);
        //   console.log('#################3');
    });
}

function resetState() {
    msgFlow.lengh = 0;
    console.log('RESET msgFlow');
}
*/
// We should also check for any captcha!
// keep an eye (counter) for captcha per session(s)
// so we can mitigate the user account being locked up
//
// <img class="img" src="https://www.facebook.com/captcha/tfbimage.php?captcha_challenge_code=1523901580-89a13273a09b7f35e763c3ca40ae8408&amp;captcha_challenge_hash=AZmRaKxJX7tUo4zsn6ANaEDoCoZXYa0lf1wrhX6GJOXS4PdiTrbBwESIDVl5j1P3pL4vWA_otf_1bl-GM6knG-LZ2fOaiQZY9qIZkeknVJj_VIxk4V3MPu4bhNlpQtIAy7GFRciON_OIXca03F53lv4fPSORBSZuNQlu_aiWtl5mvbL504bd31gmZXK1USWPVb8" alt="Hit reload on your browser to refresh this page if this image doesn't load.">
/*
function ShareSomething() {
    console.log('will share something');
    resetState();
    chrome.runtime.sendMessage({
        data: "doWordpressStuff_DONE"
    }, function (response) {
        console.log(response);
        console.log('WWWWWWWWWWWWWWWWWWWWWWWW');
    });
}

var wait = ms => new Promise((r, j) => setTimeout(r, ms));

function FB_share_like() {
    //checkFBisLoggedIn();
    checkFBPageIsLiked();
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
    var prom = wait(2000); // prom, is a promise
    var showdone = () => console.log('facebook stuff is about to be finished');
    prom.then(showdone);
    resetState();
    chrome.runtime.sendMessage({
        data: "doFacebookStuff_DONE"
    }, function (response) {
        console.log(response);
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
    });

}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = request.data || {};
    console.log(
        sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request);
    console.log('content.js:' + data);

    if (data === 'CHECK_MSG_FLOW') {
        console.log('RECIEVED:CHECK_MSG_FLOW')
        //var t = msgFlow.length;
        //sendMsgFlowResponse(t);
    }

    /*
    if ((data === 'doTwitterStuff') ||
        (data === 'doFacebookStuff') ||
        (data === 'doLocalhostNetStuff') ||
        (data === 'doWordpressStuff')) {
        if (msgFlow.length === 0) {
            console.log('GO GO GO GO');
            //msgFlow.push(data);
            //injectStuff();
            //theHypered();
        } else {
            console.log('msgFlow IS NOT EMPTY!');
            console.log(msgFlow);
        }
    }
    */

/* THIS MESSAGE NEVER CATCHED HERE */
// if(data === 'doTwitterStuff_DONE')
// {
//     console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
// }
// console.log('waiting load to complete');
//});
