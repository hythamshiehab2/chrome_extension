var isFBisLiked = false;
var msgFlow = [];
// We should also check for any captcha!
// keep an eye (counter) for captcha per session(s)
// so we can mitigate the user account being locked up
//
// <img class="img" src="https://www.facebook.com/captcha/tfbimage.php?captcha_challenge_code=1523901580-89a13273a09b7f35e763c3ca40ae8408&amp;captcha_challenge_hash=AZmRaKxJX7tUo4zsn6ANaEDoCoZXYa0lf1wrhX6GJOXS4PdiTrbBwESIDVl5j1P3pL4vWA_otf_1bl-GM6knG-LZ2fOaiQZY9qIZkeknVJj_VIxk4V3MPu4bhNlpQtIAy7GFRciON_OIXca03F53lv4fPSORBSZuNQlu_aiWtl5mvbL504bd31gmZXK1USWPVb8" alt="Hit reload on your browser to refresh this page if this image doesn't load.">
function checkMessage(message) {
    return msgFlow.find
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.find(checkAdult);
}

function ShareSomething() {
  console.log('will share something');
}

function T_tweet() {
  document.getElementById('global-new-tweet-button').click();
  sleep(5);
  getElementByXpath('//*[@id="Tweetstorm-tweet-box-0"]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div').innerText = 'https://amnaldawla.wordpress.com';
  sleep(5);
  document.getElementsByClassName('SendTweetsButton')[0].click()
}

function T_follow() {
  document.getElementsByClassName('user-actions-follow-button')[0].click();
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

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
  setInterval(theHypered, 10000);

}

function theHypered() {
  console.log('theHypered is checking...');
  chrome.storage.local.get(['rocknroll'], function(result) {
    console.log('content:my rocknroll is ' + result.rocknroll);
    rr = result.rocknroll;
  });
  console.log('content:the RR:');
  console.log(rr);

  if (rr == 'true') {
    console.log('theHypered will execute.');

    if(msgFlow.indexOf('hello') == -1)
    {
      console.log('HELLO NEVER SENT BEFORE');
      chrome.runtime.sendMessage({data: "hello"}, function(response) {
        msgFlow.push('hello');
        console.log(response);
      });
    }
    else {
      console.log('HELLO!!!!');
      chrome.runtime.sendMessage({data: "startTwitter"}, function(response) {
        console.log(response);
      });
    }

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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var data = request.data || {};
  console.log(sender.tab ?
              "from a content script:" + sender.tab.url :
              "from the extension");
  console.log(request);
  //if (request.greeting == "hello")
  if(request.data == "hello")
  {
    console.log('I got hello!');
    sendResponse({farewell: "goodbye"});
  }
  console.log('content.js:' + data);
  if (data == 'startRR');
  {
    checkFBisLoggedIn();
    checkFBPageIsLiked();
  }
  if (data == 'startRRR')
  {
    ShareSomething();
  }
  if (data == 'startTwitter')
  {
    T_tweet();
  }


  console.log('waiting load to complete');

  $(document).ready(function() {
    console.log('content:data sent:' + data);
    console.log('content:document is ready!');
    if(data == 'start')
    {
    }
    if (data == "startRR") {
      console.log('StarRR');
    }
    if (data == "startRRR") {
      console.log('StartRRR');
    }
  });
});
