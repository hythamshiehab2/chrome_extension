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
    console.log('wainting load to complete');
    console.log(request);
    console.log(sendResponse);
    console.log('xxxx');
    var t = document.querySelectorAll('textarea')[0];
    t.innerText = generateIdea();
    document.getElementById('submit').click();
    console.log('here');
    /*
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
