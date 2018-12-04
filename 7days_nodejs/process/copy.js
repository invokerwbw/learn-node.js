var child_process = require('child_process');

var util = require('util');

function copy(source, target, callback) {
    child_process.exec(
        util.format('robocopy %s/ %s', source, target), callback);
}

copy('D:\setup', 'D:\ww', function (err) {
    console.log(err);
});