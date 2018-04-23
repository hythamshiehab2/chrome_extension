/*
by Hytham Shiehab <hytham.shiehab.2@gmail.com>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/

$(document).ready({

    //document.onload = function () {
    //var a = chrome.extension.getURL("css/myactivetab.css");
    //$('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo("head");
    //var a = '#elmotasha3eb {position: fixed;width: 100 % ;height: 100 % ;top: 0;left: 0;right: 0;bottom: 0;background - color: rgba(93, 51, 204, 0.29);z - index: 10000000;cursor: pointer;}';
    //$('<style>' + a + '</style').appendTo("head");
    //$('<div id="elmotasha3eb"></div>').appendTo("body");

    //        console.log('content:data sent:' + data);
    //        console.log('content:document is ready!');
    //        if (data == 'start') {}
    //        if (data == "startRR") {
    //            console.log('StarRR');
    //        }
    //        if (data == "startRRR") {
    //            console.log('StartRRR');
    //        }
    //}
});

function theHypered() {
    console.log('theHypered is checking...');
    chrome.storage.local.get(['rocknroll'], function (result) {
        console.log('content:my rocknroll is ' + result.rocknroll);
        rr = result.rocknroll;
    });
    console.log('content:the RR:');
    console.log(rr);

    if (rr == 'true') {
        console.log('theHypered will execute.');
        //checkMessageFlow();
    } else {
        console.log('theHypered is exiting...');
        return;
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
