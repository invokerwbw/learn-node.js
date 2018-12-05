var cp = require('child_process');
var path = require('path');

var worker;

function spawn(server, config) {
    worker = cp.spawn('node', [server, config]);

    worker.on('exit', function (code) {
        if (code !== 0) {
            console.log(`server interrupt, reboot`);
            spawn(server, config);
        }
    });

    worker.stdout.on('data', (data) => {
        console.log(`child process : ${data}`);
    });
    worker.stderr.on('data', (data) => {
        console.error(`child process : ${data}`);
    });
}


function main(argv) {
    spawn(path.join(__dirname, "/server.js"), argv[0]);
    process.on('SIGTERM', function () {
        worker.kill();
        console.log(`killed...`);
        process.exit(0);
    });
}

main(process.argv.slice(2));

console.log(`daemon started...`);