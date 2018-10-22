const model = require('./model.js');
(async () => {
    var
        start = new Date().getTime(),
        execTime;
    await model.sync();
    execTime = new Date().getTime() - start;
    console.log(`exec ${execTime}ms`);
})();

// process.exit(0);