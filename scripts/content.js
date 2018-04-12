function checkFBPageIsLiked() {
  var ll = document.getElementsByClassName('likeButton')[0];
  if(!ll)
  {
    // not there
    console.log(' class not found');
  }
  else {
    console.log(' found the likeButton class');
    console.log('will like!');
    ll.click();
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
      setInterval(theHypered, 10000);
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
