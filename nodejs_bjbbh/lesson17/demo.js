const Q = require('q');
const defer = Q.defer();

const init = () => defer.promise;

init().then((success) => {
    console.log(success);
}, (error) => {
    console.log(error);
}, (progress) => {
    console.log(progress);
});

defer.notify('in progress'); //控制台打印in progress
defer.resolve('resolve'); //控制台打印resolve
defer.reject('reject'); //没有输出。promise的状态只能改变一次