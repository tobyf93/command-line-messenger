const net = require('net');

(function() {
  var sockets = [];

  const emitMessage = function(message) {
    sockets.forEach((socket) => {
      socket.write(message);
    })
  }

  const server = net.createServer()
    .on('listening', () => {
      const address = server.address();
      console.log('Started server: %j', address);
    })
    .on('connection', (socket) => {
      sockets.push(socket);

      socket.on('data', (message) => {
        emitMessage(message);
      });
    })
    .on('error', (err) => {
      throw err;
    });

  server.listen({
    host: '0.0.0.0',
    port: 3000
  });
})();
