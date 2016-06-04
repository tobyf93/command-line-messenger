const net = require('net');

(function() {
  var sockets = [];

  const emitMessage = function(message) {
    sockets.forEach((socket) => {
      socket.write(message);
    });
  }

  const removeSocket = function(socket) {
    const index = sockets.indexOf(socket);
    sockets = [...sockets.slice(0, index), ...sockets.slice(index + 1)];
    console.log(`sockets: ${sockets.length}`);
  }

  const server = net.createServer()
    .on('listening', () => {
      const address = server.address();
      console.log('Started server: %j', address);
    })
    .on('connection', (socket) => {
      sockets.push(socket);
      console.log(`sockets: ${sockets.length}`);

      socket
        .on('data', (message) => {
          emitMessage(message);
        })
        .on('close', () => {
          removeSocket(socket);
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
