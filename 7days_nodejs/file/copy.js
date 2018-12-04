var fs = require('fs');

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);
console.log(process.argv[3]);

main(process.argv.slice(2));