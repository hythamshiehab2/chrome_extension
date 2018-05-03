isMomHappy = false;
var wait = ms => new Promise((r, j) => setTimeout(r, ms));

function getData() {
    return new Promise((resolve, reject) => {
        var b = document.getElementById('x');
        if (b) {
            consoel.log('i got it');
            resolve(b);
        } else {
            console.log('missed');
            reject(b);
        }
    });
}

function test() {
    var b = null;
    //var willIGetNewPhone = new Promise(
    var willGetNewPhone = function () {
        return new Promise((resolve, reject) => {
            console.log('here');
            //setTimeout(() => {
            b = document.getElementById('global-new-tweet-button');
            if (b) {
                console.log('should not come too early');
                resolve(b);
            } else {
                console.log('not found');
                var reason = new Error('mom is not happy');
                reject(reason); // reject
            }
            //}, 10000);
            console.log('after timeout');
            console.log(b);
        });
    };

    const tweetButtonClicked = function (b) {
        var c = document.getElementById('comment');
        console.log(c);
        return Promise.resolve(c);
    };
    willGetNewPhone
        //.then(function (fulfilled) {
        .then(tweetButtonClicked);
    // yay, you got a new phone
    //console.log(fulfilled);
    // output: { brand: 'Samsung', color: 'black' }
    //})
    //.catch(function (error) {
    // oops, mom don't buy it
    //console.log(error.message);
    // output: 'mom is not happy'
    //});
}

$(document).ready(function () {
    //setTimeout(begin, 30000);
    //begin();
    //getData();
});

function begin() {
    console.log('at begin');
    //wait(30000);
    //test();
}
