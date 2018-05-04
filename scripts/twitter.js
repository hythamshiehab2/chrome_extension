isMomHappy = false;
var wait = ms => new Promise((r, j) => setTimeout(r, ms));
var messageToSpread = generateIdea();
messageToSpread = ' ' + messageToSpread;
var originalPromise = new Promise(function (resolve,reject) {
	console.log('originalPromise');
	var b = null;
	//setTimeout(function() {
	        b = document.getElementById('global-new-tweet-button') || false;
		if(b)
		{
			c = b;
			console.log(b);
			resolve(c);
		}
		else
		{
			console.log('negative');
			reject('negative');
		}
	//}, 10000);
});
var myPromise = MakeQuerablePromise(originalPromise);

var clickTweetButton = new Promise(function (resolve,reject) {
	console.log('clickTweetButton');
	b = document.getElementById('global-new-tweet-button') || false;
	simulate(b,"click");
	return Promise.resolve(b);
});

var clickTweetBox = new Promise(function (resolve,reject) {
	console.log('clickTweetBox');
	var b = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
	simulate(b,"mousedown");
	return Promise.resolve(b);
});

var typeText = new Promise(function (resolve, reject) {
	console.log('typeText');
    var typed = false;
    var t = document.getElementsByClassName('tweet-box rich-editor is-showPlaceholder')[1] || false;
    console.log('will type:' + messageToSpread + 'in ' + t);
    $(t).typetype(messageToSpread, {
        e: 0.04, // error rate. (use e=0 for perfect typing)
        t: 100, // interval between keypresses
        keypress: function () {
            // called after every keypress (this may be an erroneous keypress!)
            console.log('typeing...')
            //return Promise.pending();
        },
        callback: function () {
            // the `this` keyword is bound to the particular element.
            console.log('TYPETYPE!');
            return Promise.resolve('done!');
        }
    });
});


var clickTweetSend = new Promise(function (resolve,reject) {
	console.log('clickTweetSend');
	var b = document.getElementsByClassName('SendTweetsButton')[0];
	simulate(b,"click");
	return Promise.resolve(b);
});


function generateIdea() {
    var ideas = [
  "قال لي أفّاك يوما، كدب مساوي ولا صدق منعكش\nجدلت المقادير وضفرت، فتنعكش الكدب المساوي وبقي الصدق صدقا\n#وضع_الناموسيه",
    "الكلام المكتوب في المدونة دي عجيب جدا، لو كدب يبقى اللي كتبه يتحاكم علنا، ولو صدق، يبقى الأمن الوطني وغيره لازم يتحاكموا",
    "هو احنا مش هانخلص من القرف ده!؟، لازم يتحط قانون واضح ويتفعل مش على الارفف، ان اي موظف رسمي يكدب لازم يتعاقب عقاب رادع، والا مش هايبقى فيه حاجه اسمها نظام اصلا",
    "يعني جزيرة برمودا ماطلعتش بتغرق سفن ولا طيارات، طلعت بتغرق فلوس وبتغسلها وملجأ لغسيل الاموال والحسابات السريه، وكمان بعلم الأجهزة الأمنيه اللي بتحب تظهر نفسها على انها رفيعه المستوى و.. نزيهه عن المصلحة القذرة",
  ];
    var randomArrayPosition = Math.floor(Math.random() * ideas.length);
    var idea = ideas[randomArrayPosition];
    return idea;
}

function callItAgain() {
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
	//var myPromise = MakeQuerablePromise(originalPromise);
	console.log("Initial fulfilled:", myPromise.isFulfilled());//false
	console.log("Initial rejected:", myPromise.isRejected());//false
	console.log("Initial pending:", myPromise.isPending());//true

	myPromise
	.then(clickTweetButton)
	.then(clickTweetBox)
	.then(typeText)
	.then(clickTweetSend)
	/* working fine 
	.then(function(data){
	    console.log(data); // "Yeah !"
	    console.log("Final fulfilled:", myPromise.isFulfilled());//true
	    console.log("Final rejected:", myPromise.isRejected());//false
	    console.log("Final pending:", myPromise.isPending());//false
	}) */
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
