global.localMessenger = {
  users: [],
  messageLog: []
};

const net = require('net'),
      serverListening = require('./lib/serverListening'),
      connectionEstablished = require('./lib/connectionEstablished');

(function() {
  const server = net.createServer()
    .on('listening', () => serverListening(server))
    .on('connection', (socket) => connectionEstablished(socket))
    .on('error', (err) => {
      throw err;
    });

  server.listen({
    host: '0.0.0.0',
    port: 3000
  });
})();
