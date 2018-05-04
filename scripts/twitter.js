isMomHappy = false;
var wait = ms => new Promise((r, j) => setTimeout(r, ms));

var originalPromise = new Promise(function (resolve,reject) {
	var b = null;
	//setTimeout(function() {
	        b = document.getElementById('global-new-tweet-button');
		if(b)
		{
			console.log(b);
			resolve(b);
		}
		else
		{
			console.log('negative');
			reject('negative');
		}
	//}, 10000);
});

function callItAgain() {
	var myPromise = MakeQuerablePromise(originalPromise);
	myPromise
	.then(function(data){
	    console.log(data); // "Yeah !"
	    console.log("Final fulfilled:", myPromise.isFulfilled());//true
	    console.log("Final rejected:", myPromise.isRejected());//false
	    console.log("Final pending:", myPromise.isPending());//false
	})
	.catch(function(data){
	   console.log(data);		
		if(data === 'negative')
		{
			console.log('will call it again');
			setTimeout(callItAgain,5000);
		}
	});
}

$(document).ready(function () {
    //setTimeout(begin, 30000);
    //begin();
    //getData();
	console.log('document ready');
	var myPromise = MakeQuerablePromise(originalPromise);
	console.log("Initial fulfilled:", myPromise.isFulfilled());//false
	console.log("Initial rejected:", myPromise.isRejected());//false
	console.log("Initial pending:", myPromise.isPending());//true

	myPromise
	.then(function(data){
	    console.log(data); // "Yeah !"
	    console.log("Final fulfilled:", myPromise.isFulfilled());//true
	    console.log("Final rejected:", myPromise.isRejected());//false
	    console.log("Final pending:", myPromise.isPending());//false
	})
	.catch(function(data){
		if(data === 'negative')
		{
			callItAgain();
		}
	   console.log(data);		
	});
});

function begin() {
    console.log('at begin');
    //wait(30000);
    //test();
    //var x = getData();
}

function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}
