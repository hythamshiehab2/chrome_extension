var isFBisLiked = false;

function checkFBPageIsLiked() {
  console.log('check fb page is liked first!');
  var likedButton = document.getElementsByClassName('likedButton')[0];
  if(!likedButton)
  {
    // not liked!?
    console.log('will like!');
    var likeButton = document.getElementsByClassName('likeButton')[0];
    if(!likeButton) {
      console.log('now what!? didtn found the like/liked buttons!');
    }
    else {
      likeButton.click();
      console.log('this will Do!');
      isFBisLiked = true;
      setInterval(theHypered, 10000);
    }
  }
  else {
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

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("xxxx happening from the extension");
    var data = request.data || {};
    console.log('data sent:' + data);
    console.log('waiting load to complete');
    //console.log(request);
    //console.log(sendResponse);
    /*
    likeButton _4jy0 _4jy4 _517h _51sy _42ft
    */
    /* for later
    $(document).ready(function() {
      $('iframe').load(function() {
       // do something
     });
    });
    */


    $(document).ready(function() {
      checkFBPageIsLiked();
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
