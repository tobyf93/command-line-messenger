const net = require('net');

(function() {
  const server = net.createServer()
    .on('listening', () => {
      const address = server.address();
      console.log('Started server: %j', address);
    })
    .on('connection', (socket) => {
      socket.on('data', (data) => {
        // console.log(data.toString());
        socket.write(data)
      });
    })
    .on('error', (err) => {
      throw err;
    });

  server.listen();
})();
