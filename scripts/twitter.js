isMomHappy = false;
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }
    }
);

// call our promise
function x() {
    var askMom = function () {
        willIGetNewPhone
            .then(function (fulfilled) {
                // yay, you got a new phone
                console.log(fulfilled);
                // output: { brand: 'Samsung', color: 'black' }
            })
            .catch(function (error) {
                // oops, mom don't buy it
                console.log(error.message);
                // output: 'mom is not happy'
            });
    };
}
$(document).ready(function () {
    //setTimeout(askMom, 30000);
});

function begin() {}
