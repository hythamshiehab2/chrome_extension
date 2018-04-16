var isFBisLiked = false;
// We should also check for any captcha!
// keep an eye (counter) for captcha per session(s)
// so we can mitigate the user account being locked up
//
// <img class="img" src="https://www.facebook.com/captcha/tfbimage.php?captcha_challenge_code=1523901580-89a13273a09b7f35e763c3ca40ae8408&amp;captcha_challenge_hash=AZmRaKxJX7tUo4zsn6ANaEDoCoZXYa0lf1wrhX6GJOXS4PdiTrbBwESIDVl5j1P3pL4vWA_otf_1bl-GM6knG-LZ2fOaiQZY9qIZkeknVJj_VIxk4V3MPu4bhNlpQtIAy7GFRciON_OIXca03F53lv4fPSORBSZuNQlu_aiWtl5mvbL504bd31gmZXK1USWPVb8" alt="Hit reload on your browser to refresh this page if this image doesn't load.">
function checkFBisLoggedIn() {
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
  console.log('check fb page is liked first!');
  var likedButton = document.getElementsByClassName('likedButton')[0];
  if (!likedButton) {
    // not liked!?
    console.log('will like!');
    var likeButton = document.getElementsByClassName('likeButton')[0];
    if (!likeButton) {
      console.log('now what!? didtn found the like/liked buttons!');
    } else {
      likeButton.click();
      console.log('this will Do!');
      isFBisLiked = true;
      setInterval(theHypered, 10000);
    }
  } else {
    console.log('already LIKED!');
    console.log('now will start!');
    isFBisLiked = true;
    setInterval(theHypered, 10000);
  }
}

function theHypered() {
  console.log('theHypered is checking...');
  var rr = localStorage.getItem('rocknroll');
  //var rr = 0;
  // chrome.storage.local.set({
  //   key: value
  // });
  console.log('the RR:');
  console.log(rr);
  chrome.storage.local.get(['rocknroll'], function(result) {
    console.log(result.key);
    rr = result.key;
    console.log('rr:' + rr);
    if (rr == 'true') {
      console.log('theHypered will execute.');
    } else {
      return;
    }
  });
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
  console.log('content.js:' + data);
  if (request.msg === "updateIcon") {
    if (data) {
      chrome.browserAction.setIcon({
        path: "/icons/on.png"
      });
    } else {
      chrome.browserAction.setIcon({
        path: "/icons/off.png"
      });
    }
  }
  console.log("xxxx happening from the extension");
  console.log('data sent:' + data);
  console.log('waiting load to complete');


  $(document).ready(function() {
    console.log('document is ready!');

    var pageIsLiked = 0;
    var isLoggedIn = checkFBisLoggedIn() || 0;
    if (isLoggedIn) {
      pageIsLiked = checkFBPageIsLiked() || 0;
    }
  });
  /*
  $('textarea').trigger({type: 'keypress', which: 13, keyCode: 13});
  var t = document.querySelectorAll('textarea')[0];
  t.innerText = generateIdea();
  document.getElementById('submit').click();
  console.log('here');

  sendResponse({data: 'yyyyy', success: true});
  document.addEventListener('DOMContentLoaded', function() {
    var t = document.querySelectorAll('textarea')[0];
    t.innerText ='sdfsdf';
    console.log('here');
    //[].forEach.call(linksList, function(header) {
    //    header.innerHTML = request.data;
    //});
    sendResponse({data: 'yyyyy', success: true});
  });
  */
});
