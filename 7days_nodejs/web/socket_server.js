var net = require('net');

net.createServer(function (conn) {
    conn.on('data', function (data) {
        console.log(data.toString());
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(8080);