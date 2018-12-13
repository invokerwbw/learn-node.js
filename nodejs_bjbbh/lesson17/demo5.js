var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，传递给outputPromise
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * function(fulfilled)将新的promise赋给outputPromise
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(null, function (rejected) {
    return 'rejected';
});

outputPromise.then(function (fulfilled) {
    console.log('fulfilled: ' + fulfilled);
}, function (rejected) {
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject('inputpromise rejected');

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
defer.resolve('inputpromise fulfilled'); //控制台打印fulfilled: inputpromise fulfilled