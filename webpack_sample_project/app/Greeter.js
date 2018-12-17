var config = require('./config.json');
var style = require('./Greeter.css');

module.exports = function () {
    var greet = document.createElement('div');
    greet.classList.add(style.root);
    greet.textContent = config.greetText;
    return greet;
};