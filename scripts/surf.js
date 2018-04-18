var myLocalData;
//This line opens up a long-lived connection to your background page.
// var port = chrome.runtime.connect({name:"mycontentscript"});
// port.onMessage.addListener(function(message,sender){
//   if(message.greeting === "hello"){
//     //alert(message.greeting);
//   }
// });

function TT() {
  console.log('TT is called');
}

// function doHomework(subject, callback) {
//   alert(`Starting my ${subject} homework.`);
//   callback();
// }
function alertFinished(){
  console.log('Finished my homework');
}
// doHomework('math', alertFinished);

function startRR() {
  //   RR(function() {
  //     RRR();
  //   }
  // });
  var t = 'll';
  RR(t,alertFinished);
  //RRR(t,alertFinished);
  //$.when(function RR()).then(function RRR;
  // $.when(RR()).done(function() {
  //   RRR();
  // });
  // RR(function(callback) {
  //   callback();
  // });
  // RRR(function(callback) {
  //   callback();
  // });
  //RR().then(RRR());
}

function RRR(data, callback) {
  console.log('RRRRR is callled ');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(
      tabs[0].id, {
        url: 'https://amnaldawla.wordpress.com'
      },
      function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
              data: "startRRR"
            });
          }
        });
      });
  });
  callback();
}

function RRisFinished() {
  console.log('xxxxxxxxxxx');
}
function RR(data,callback) {
  console.log('surf:RR is called');
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(
      tabs[0].id, {
        url: 'https://www.facebook.com/en7erafatamnaldawla'
      },
      function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status == 'complete') {
            // Now the tab is ready!
            chrome.tabs.sendMessage(tabs[0].id, {
              data: "startRR"
            });
          }
        });
      });
  });
  callback();
}

(function() {
  console.log('surf:here');
  started = localStorage.getItem('started');
  rocknroll = localStorage.getItem('rocknroll');
  console.log('surf:started:' + started);
  if (started == 'true') {
    $('#toggleButton').bootstrapToggle('on');
    $('#theContract').css('display', 'block');
  } else {
    $('#toggleButton').bootstrapToggle('off');
    $('#theContract').css('display', 'none');
  }
  if (rocknroll == 'true') {
    $('#toggleStartNow').bootstrapToggle('on');
  } else {
    $('#toggleStartNow').bootstrapToggle('off');
  }
})();

window.onload = function() {
  console.log('surf:window is loaded');
  var rr = 0;
  rr = localStorage.getItem('rocknroll');
  console.log('rr:' + rr);
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    console.log('storage changed');
    console.log(changes + ':' + areaName);
  });
}

$('#toggleButton').change(function() {
  $('#console-event').html('Toggle: ' + $(this).prop('checked'));
  status = $(this).prop('checked');
  if (status == 'true') {
    localStorage.setItem('started', 'true');
    chrome.storage.local.set({
      'started': 'true'
    }, function() {
      // Notify that we saved.
      console.log('surf:Settings saved');
    });
    $('#console-event').html('will r&r!');
    $('#theContract').css('display', 'block');
    //TT();
  } else {
    localStorage.setItem('started', 'false');
    localStorage.setItem('rocknroll', 'false');
    chrome.storage.local.set({
      'started': 'false',
      'rocknroll': 'false'
    }, function() {
      // Notify that we saved.
      console.log('surf:Settings saved');
    });
    console.log('started:false');
    $('#theContract').css('display', 'none');
  }
});

$('#toggleStartNow').change(function() {
  status = $(this).prop('checked');
  if (status == 'true') {
    chrome.browserAction.setBadgeText({
      "text": localStorage.length.toString()
    });
    localStorage.setItem('rocknroll', 'true');
    chrome.storage.local.set({
      'rocknroll': 'true'
    }, function() {
      // Notify that we saved.
      console.log('surf:Settings saved');
    });
    startRR();
  } else {
    console.log('rr is off');
    localStorage.setItem('rocknroll', 'false');
    chrome.storage.local.set({
      'rocknroll': 'false'
    }, function() {
      // Notify that we saved.
      console.log('surf:Settings saved');
    });
  }
  localStorage.setItem('liked', '0');
  chrome.storage.local.set({
    'liked': '0'
  }, function() {
    // Notify that we saved.
    console.log('surf:Settings saved');
  });
});
