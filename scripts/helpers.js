/*
CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/
"use strict";
var isFBisLiked = false;
var isFBisLiked = false;
//var msgFlow = [];
//var msgPipe = ['doFacebookStuff', 'doWordpressStuff', 'doTwitterStuff'];

/*
function theHypered() {
    var ctx = 0;
    console.log('theHypered is checking...');
    chrome.storage.local.get(['rocknroll'], function (result) {
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
        //T_tweet();
        //setTimeout(begin, 20000);
        begin();
        //console.log('will call askHytham');
    }
    if (willGoTo === 'doFacebookStuff') {
        //FB_share_like();
    }
    if (willGoTo === 'doWordpressStuff') {
        //ShareSomething();
    }
    if (willGoTo === 'doLocalhostStuff') {
        //T_tweet();
        begin();
        console.log('will call askHytham');
    }
}
*/
function parseSitemap() {
    //var url = $siteMapURL.val();
    //if ($.trim(url) === '') return;
    //$results.val('');
    //$status.html('<i>Trying to parse the sitemap.</i>');
    //console.log('try to parse ' + url);

    /*
    A sitemap may consist of a list of sitemaps. So step one is to see
    if that exists. We'll create an array for all the sitemaps we need to parse.
    For simple sitemaps w/o a list of others, the array will have one item.
    */
    var sitemaps = [];

    var query = "http://localhost.test.net/sitemap.xml";
    $.get(query).then(function (res) {
        if (res.query.diagnostics && res.query.diagnostics.url[0]["http-status-code"] === "404") {
            $status.html('<b>This URL appears to be invalid.</b>');
            return;
        } else if (res.query.count > 0) {
            for (var i = 0; i < res.query.count; i++) {
                sitemaps.push(res.query.results.sitemap[i].loc);
            }
        } else {
            sitemaps[0] = url;
        }
        console.log('sitemaps to handle is ' + sitemaps);
        $status.html('<i>Gathering data for sitemaps URLs.</i>');
        var promises = [];
        sitemaps.forEach(function (sitemap) {
            var def = $.Deferred();
            var query = "http://localhost.test.net/sitemap.xml";
            $.get(query).then(function (res) {
                def.resolve(res.query.results.loc);
            });
            promises.push(def);
        });
        $.when.apply($, promises).done(function () {
            console.log('totally done getting urls');
            var results = [];
            for (var i = 0; i < arguments.length; i++) {
                for (var x = 0; x < arguments[i].length; x++) {
                    results.push(arguments[i][x]);
                }
            }
            console.log('found ' + results.length + ' urls');
            $status.html('<b>Found ' + results.length + ' URLs.</b>');
            $results.val(results.join('\n'));
        });
    });
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

function doItNow() {
    chrome.runtime.sendMessage({
        data: "doItNow_REQUEST"
    }, function (response) {});
}

function parseSitemap() {
    //Parse the givn XML
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    // Find Person Tag
    var $url = $xml.find("url");
    var image_loc = [];
    var urls = [];
    var images = [];
    $url.each(function () {
        var loc = $(this).find('loc').text();
        urls.push(loc);
    });
    var $image = $xml.find("image");
    console.log($image);
    $image.each(function () {
        var loc = $(this).find('image_loc').text();
        images.push(loc);
    });
    var data = [urls, images];
    return data;
}

function getRandomImage() {
    //Parse the givn XML
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    // Find Person Tag
    var $image = $xml.find("image");
    var images = [];
    $image.each(function () {
        var loc = $(this).find('image_loc').text();
        images.push(loc);
    });
    var randomArrayPosition = Math.floor(Math.random() * images.length);
    return images[randomArrayPosition];
}

function getRandomLink() {
    //Parse the givn XML
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    // Find Person Tag
    var $url = $xml.find("url");
    var urls = [];
    $url.each(function () {
        var loc = $(this).find('loc').text();
        urls.push(loc);
    });
    var randomArrayPosition = Math.floor(Math.random() * urls.length);
    return urls[randomArrayPosition];
}

var xml = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url><loc>https://amnaldawla.wordpress.com/coordinates/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/54f02925-d5b8-412f-8f7f-402cae5bd3ab.jpg</image_loc><image:title>54f02925-d5b8-412f-8f7f-402cae5bd3ab</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/e95b5d4d-3087-4eba-bea6-cf2a2e910894.jpg</image_loc><image:title>e95b5d4d-3087-4eba-bea6-cf2a2e910894</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/b71a4c52-dc75-4943-a7b0-2ec65e25f635.jpg</image_loc><image:title>b71a4c52-dc75-4943-a7b0-2ec65e25f635</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/ecc2562a-8f85-4ad4-8433-a0c124f69295.jpg</image_loc><image:title>ecc2562a-8f85-4ad4-8433-a0c124f69295</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/1d632316-0448-4a27-94a0-0faacc0b08c6.jpg</image_loc><image:title>1d632316-0448-4a27-94a0-0faacc0b08c6</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/95ffdcbc-db6e-4581-a23b-79e096cba1de.jpg</image_loc><image:title>95ffdcbc-db6e-4581-a23b-79e096cba1de</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/6dd2f4f0-793f-4448-ba17-3f71cee17d09.jpg</image_loc><image:title>6dd2f4f0-793f-4448-ba17-3f71cee17d09</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/f72693a9-c957-4a2b-8768-9ba43e7eb844.png</image_loc><image:title>f72693a9-c957-4a2b-8768-9ba43e7eb844</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/b25c26bc-5b63-412f-b1b6-79cbcb7f301f.png</image_loc><image:title>b25c26bc-5b63-412f-b1b6-79cbcb7f301f</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/1f7748c4-7974-4c2e-87f7-c6f41a8cd080.png</image_loc><image:title>1f7748c4-7974-4c2e-87f7-c6f41a8cd080</image:title></image><lastmod>2018-05-07T05:13:32+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/2018/01/30/1-19/</loc><mobile:mobile/><lastmod>2018-05-06T20:04:43+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/01/30/1-18/</loc><mobile:mobile/><lastmod>2018-05-06T20:04:20+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/01/30/1-17/</loc><mobile:mobile/><lastmod>2018-05-06T20:03:25+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/01/30/1-16/</loc><mobile:mobile/><lastmod>2018-05-06T20:03:05+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/01/31/1-15/</loc><mobile:mobile/><lastmod>2018-05-06T20:02:43+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/04/1-14/</loc><mobile:mobile/><lastmod>2018-05-06T20:02:19+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/04/1-13/</loc><mobile:mobile/><lastmod>2018-05-06T20:01:53+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/04/1-12/</loc><mobile:mobile/><lastmod>2018-05-06T20:00:46+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/09/1-11/</loc><mobile:mobile/><lastmod>2018-05-06T19:59:55+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/09/1-10/</loc><mobile:mobile/><lastmod>2018-05-06T19:59:33+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/09/1-9/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/02/database_instructions_done.png</image_loc><image:title>database_instructions_done</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/02/cso-exoloits_done.png</image_loc><image:title>cso-exoloits_done</image:title></image><lastmod>2018-05-06T19:59:09+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/22/1-8/</loc><mobile:mobile/><lastmod>2018-05-06T19:58:45+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/02/23/1-7/</loc><mobile:mobile/><lastmod>2018-05-06T19:58:22+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/04/06/1-6/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/plot.png</image_loc><image:title>plot</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/d985d8aed8b7d991d8b7-d8a7d984d8a3d8add8afd8a7d8ab-2.png</image_loc><image:title>مخطّط الأحداث (2)</image:title></image><lastmod>2018-05-06T19:57:56+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/04/06/1-5/</loc><mobile:mobile/><lastmod>2018-05-06T19:57:35+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/04/09/1-3/</loc><mobile:mobile/><lastmod>2018-05-06T19:56:53+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/04/16/1-2/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/2.png</image_loc><image:title>2</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/1.png</image_loc><image:title>1</image:title></image><lastmod>2018-05-06T19:56:27+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/2018/04/21/1/</loc><mobile:mobile/><lastmod>2018-05-06T19:54:58+00:00</lastmod><changefreq>monthly</changefreq></url><url><loc>https://amnaldawla.wordpress.com/attachements/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/d8acd988d8a7d8a8d8a7d8aa-d8a7d984d8a7d8b9d8aad982d8a7d984.jpg</image_loc><image:title>جوابات الاعتقال</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/d8a7d8aed8aad8b1d8a7d982-d985d988d982d8b9-d985d8b5d984d8add8a9-d8a7d984d8a7d8add988d8a7d984-d8a7d984d985d8afd986d98ad8a9-3.jpg</image_loc><image:title>اختراق موقع مصلحة الاحوال المدنية - 3</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/d8a7d8aed8aad8b1d8a7d982-d985d988d982d8b9-d985d8b5d984d8add8a9-d8a7d984d8a7d8add988d8a7d984-d8a7d984d985d8afd986d98ad8a9-2.jpg</image_loc><image:title>اختراق موقع مصلحة الاحوال المدنية - 2</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/d8a7d8aed8aad8b1d8a7d982-d985d988d982d8b9-d985d8b5d984d8add8a9-d8a7d984d8a7d8add988d8a7d984-d8a7d984d985d8afd986d98ad8a9-1.jpg</image_loc><image:title>اختراق موقع مصلحة الاحوال المدنية - 1</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/d985d8add8b6d8b1-d8a7d984d8aad8add8b1d98ad8a7d8aa1.png</image_loc><image:title>محضر التحريات</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/02/trojan.png</image_loc><image:title>التروجان</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/02/blogspot_heading1.png</image_loc><image:title>لقطة للصّفحة الرئيسية للمدونة السابقه</image:title><image:caption>وتظهر "راية" المدونة، موضّحة مفسّرة، فاضحة مدويّة، محيّرة مخيّرة، فهل تتقدّم أمن الدّولة وتقوم بما تحتّمه المسؤوليّة الأمنية، ام تتنصّل بما تقرّره مصلحة عدم إحراجها!؟ هذا هو السّؤال، وتلك هي الإجابة</image:caption></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/01/11.png</image_loc><image:title>1</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/01/x.png</image_loc><image:title>الرّائد ع.ص.</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/01/sans2.png</image_loc><image:title>مكتبة القراءة في أكبر معهد لأمن المعلومات في العالم</image:title></image><lastmod>2018-05-06T19:48:30+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/maneuvers/</loc><mobile:mobile/><lastmod>2018-05-06T19:48:10+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/subjects/flow/</loc><mobile:mobile/><lastmod>2018-05-06T19:47:26+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/subjects/</loc><mobile:mobile/><lastmod>2018-05-06T19:46:43+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/subjects/about/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/nationalf_done.png</image_loc><image:title>nationalF_done</image:title></image><lastmod>2018-05-06T19:46:08+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/quotes/</loc><mobile:mobile/><lastmod>2018-05-06T19:44:22+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/polls/</loc><mobile:mobile/><lastmod>2018-05-06T19:44:00+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/license/</loc><mobile:mobile/><lastmod>2018-05-06T19:43:28+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/attachements_view/</loc><mobile:mobile/><lastmod>2018-05-06T19:41:27+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/attachements_print/</loc><mobile:mobile/><lastmod>2018-05-06T19:38:47+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/20531-2/</loc><mobile:mobile/><lastmod>2018-05-02T12:03:32+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/04/1_1.jpg</image_loc><image:title>1_1</image:title></image><lastmod>2018-04-20T14:44:05+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/%d8%a7%d9%84%d9%85%d9%86%d8%b4%d9%88%d8%b1%d8%a7%d8%aa/</loc><mobile:mobile/><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/manshorat.png</image_loc><image:title>manshorat</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/manshorat_front.png</image_loc><image:title>manshorat_front</image:title></image><image><image_loc>https://amnaldawla.files.wordpress.com/2018/03/manshorat_back.png</image_loc><image:title>manshorat_back</image:title></image><lastmod>2018-04-09T20:22:12+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/%d8%a7%d9%84%d9%8a%d9%88%d9%85%d9%8a%d9%91%d8%a7%d8%aa/</loc><mobile:mobile/><lastmod>2018-04-09T20:15:11+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/%d9%85%d9%88%d8%b6%d9%88%d8%b9%d8%a7%d8%aa/</loc><mobile:mobile/><lastmod>2018-02-04T15:11:06+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com/contact/</loc><mobile:mobile/><lastmod>2018-01-24T20:22:39+00:00</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url><url><loc>https://amnaldawla.wordpress.com</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>2018-05-07T05:13:32+00:00</lastmod></url></urlset>';
