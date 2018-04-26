/*
CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/
var isFBisLiked = false;
var isFBisLiked = false;
var msgFlow = [];
var msgPipe = ['doFacebookStuff', 'doWordpressStuff', 'doTwitterStuff'];

function theHypered() {
  var ctx = 0;
  console.log('theHypered is checking...');
  chrome.storage.local.get(['rocknroll'], function(result) {
    console.log('content:my rocknroll is ' + result.rocknroll);
    ctx = result.rocknroll;
    if (ctx == 'true') {
      console.log('theHypered will execute.');
      checkMessageFlow();
    } else {
      console.log('theHypered is exiting...');
    }
  });
  //setTimeout(theHypered, 30000);
}

function checkMessageFlow() {
  // this will keep track of the flow of the procedures, acting as the officer of Elmoror
  // Till now, I have no IDEA how!
  //
  console.log('checkMessageFlow');
  console.log(msgFlow);
  var msg = msgFlow.shift() || false;
  console.log('msg:' + msg);
  var willGoTo = msg;
  if (!willGoTo) {
    var randomArrayPosition = Math.floor(Math.random() * msgPipe.length);
    willGoTo = msgPipe[randomArrayPosition];
  }
  console.log('willGoTo:' + willGoTo);
  if (willGoTo === 'doTwitterStuff') {
    T_tweet();
  }
  if (willGoTo === 'doFacebookStuff') {
    FB_share_like();
  }
  if (willGoTo === 'doWordpressStuff') {
    ShareSomething();
  }
}

function simulate(element, eventName) {
  var options = extend(defaultOptions, arguments[2] || {});
  var oEvent, eventType = null;

  for (var name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) {
      eventType = name;
      break;
    }
  }

  if (!eventType)
    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType == 'HTMLEvents') {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
        options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
        options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    var evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent('on' + eventName, oEvent);
  }
  return element;
}

function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}

var eventMatchers = {
  'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
