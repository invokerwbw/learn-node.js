var Q = require('q');
var defer = Q.defer();

//一个模拟数据库
var users = [{
    'name': 'andrew',
    'passwd': 'password'
}, {
    'name': 'invoker',
    'passwd': 'password'
}];

function getUsername() {
    return defer.promise;
}

function getUser(username) {
    var user;
    users.forEach(function (element) {
        if (element.name === username) {
            user = element;
        }
    });
    return user;
}

//promise链
getUsername().then(function (username) {
    return getUser(username);
}).then(function (user) {
    console.log(user);
});

defer.resolve('i');