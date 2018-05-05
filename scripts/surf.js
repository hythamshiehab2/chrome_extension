/*
CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/

var myLocalData;

function alertFinished() {
    console.log('Finished my homework');
}

//document.addEventListener('DOMContentLoaded',function(dcle) {
//document.addEventListener('DOMContentLoaded', register);
//document.addEventListener('loaded', register);
//window.onload = register();
window.addEventListener("load", register);
//window.onload = function() {
function moduleLoadProgress(event) {
    var loadPercent = 0.0;
    var loadPercentString;
    if (event.lengthComputable && event.total > 0) {
        loadPercent = event.loaded / event.total * 100.0;
        loadPercentString = loadPercent + '%';
        common.logMessage('progress: ' + event.url + ' ' + loadPercentString +
            ' (' + event.loaded + ' of ' + event.total + ' bytes)');
    } else {
        // The total length is not yet known.
        common.logMessage('progress: Computing...');
    }
}

function register() {
    //$(document).ready(function() {
    console.log('document is loaded');
    console.log('surf:here');
    started = localStorage.getItem('started') || 'false';
    rocknroll = localStorage.getItem('rocknroll') || 'false';
    console.log('surf:started:' + started);
    if (started === 'true') {
        $('#toggleButton').bootstrapToggle('on');
        $('#theContract').css('display', 'block');
    } else {
        $('#toggleButton').bootstrapToggle('off');
        $('#toggleStartNow').bootstrapToggle('off');
        $('#theContract').css('display', 'none');
    }
    if (rocknroll === 'true') {
        $('#toggleStartNow').bootstrapToggle('on');
    } else {
        $('#toggleStartNow').bootstrapToggle('off');
    }

    $('#toggleButton').change(function () {
        $('#console-event').html('Toggle: ' + $(this).prop('checked'));
        status = $(this).prop('checked');
        if (status == 'true') {
            localStorage.setItem('started', 'true');
            chrome.storage.local.set({
                'started': 'true'
            }, function () {
                // Notify that we saved.
                console.log('surf:Settings saved');
            });
            $('#console-event').html('will r&r!');
            $('#theContract').css('display', 'block');
            chrome.runtime.sendMessage({
                data: "startEngine"
            }, function (response) {
                console.log("from background:" + response);
                console.log(response);
            });
        } else {
            localStorage.setItem('started', 'false');
            localStorage.setItem('rocknroll', 'false');
            chrome.storage.local.set({
                'started': 'false',
                'rocknroll': 'false'
            }, function () {
                // Notify that we saved.
                console.log('surf:Settings saved');
            });
            console.log('started:false');
            $('#toggleStartNow').bootstrapToggle('off');
            $('#theContract').css('display', 'none');
        }
    });

    $('#toggleStartNow').change(function () {
        status = $(this).prop('checked');
        if (status == 'true') {
            chrome.browserAction.setBadgeText({
                "text": localStorage.length.toString()
            });
            localStorage.setItem('rocknroll', 'true');
            chrome.storage.local.set({
                'rocknroll': 'true'
            }, function () {
                // Notify that we saved.
                console.log('surf:Settings saved');
            });
            chrome.runtime.sendMessage({
                data: "surfStartIgnition"
            }, function (response) {
                console.log("from background:" + response);
                console.log(response);
            });
        } else {
            console.log('rr is off');
            localStorage.setItem('rocknroll', 'false');
            chrome.storage.local.set({
                'rocknroll': 'false'
            }, function () {
                // Notify that we saved.
                console.log('surf:Settings saved');
            });
        }
        localStorage.setItem('liked', '0');
        chrome.storage.local.set({
            'liked': '0'
        }, function () {
            // Notify that we saved.
            console.log('surf:Settings saved');
        });
    });
    //});

}

// (function () {
// })();

// window.onload = function () {
//     console.log('surf:window is loaded');
//     var rr = 0;
//     rr = localStorage.getItem('rocknroll');
//     console.log('rr:' + rr);
//     chrome.storage.onChanged.addListener(function (changes, areaName) {
//         console.log('storage changed');
//         console.log(changes + ':' + areaName);
//     });
// }
