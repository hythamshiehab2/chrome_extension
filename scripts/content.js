var isFBisLiked = false;

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
  console.log('theHypered is called.');
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
