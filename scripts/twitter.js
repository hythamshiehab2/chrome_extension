window.onload = function() {
  console.log('twitter.js INJECTED');
  T_tweet();
};

function T_tweet() {
  // first check if we are logged in
  var k = isLoggedIn();
  if (k) {
    console.log('T_tweet');
    b = get_Ta();
    b.click();
    console.log('button clicked');
    t = get_Tb();
    //t.innerText = 'إذا عدتم عدنا';
    simulate(t, "mousedown");
    $(t).sendkeys('قال لي أفّاك يوما، كدب مساوي ولا صدق منعكش');
    $(t).sendkeys('{Enter}');
    $(t).sendkeys('جدلت المقادير وضفّرت، فتنعكش الكدب المساوي وظل الصدق صدقا');
    $(t).sendkeys('{Enter}');
    $(t).sendkeys('#وضع_الناموسية');
    c = get_Tc();
    var prom = wait(2000) // prom, is a promise
    var showdone = () => simulate(c, "click");
    prom.then(showdone);
    console.log('tweeted!');
    resetState();
    chrome.runtime.sendMessage({
      data: "doTwitterStuff_DONE"
    }, function(response) {
      console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
      console.log(response);
    });
  }
  else
  {
    chrome.runtime.sendMessage({
      data: "alarmTwitterNotLoggedIn"
    })
  }
}

function isLoggedIn() {
  var l = document.getElementsByClassName('dropdown-signin');
  if (l.length) {
    return false
  } else {
    return true;
  }
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
