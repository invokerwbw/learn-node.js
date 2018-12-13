var Q = require('q');

function foo(result) {
    console.log(result);
    return result + result;
}
//手动链接
Q('hello').then(foo).then(foo).then(foo); //控制台输出： hello
//			   hellohello
//			   hellohellohello

//动态链接
var funcs = [foo, foo, foo];
var result = Q('hello');
funcs.forEach(function (func) {
    result = result.then(func);
});
//精简后的动态链接
funcs.reduce(function (prev, current) {
    return prev.then(current);
}, Q('hello'));