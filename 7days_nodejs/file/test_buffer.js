var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);

console.log(`bin: ${bin}`);

var sub = bin.slice(2);

console.log(`bin.slice(2): ${sub}`);

sub[0] = 0x65;

console.log(`after modify bin: ${bin}`);