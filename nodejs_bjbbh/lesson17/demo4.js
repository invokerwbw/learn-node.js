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
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，这个rejected会传向outputPromise
 */
var outputPromise = getInputPromise().then(function (fulfilled) {
    return 'fulfilled';
});
outputPromise.then(function (fulfilled) {
    console.log('fulfilled: ' + fulfilled);
}, function (rejected) {
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject('inputpromise rejected'); //控制台打印rejected: inputpromise rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve();