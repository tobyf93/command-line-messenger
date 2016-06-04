const net = require('net'),
      connectionEstablished = require('./lib/connectionEstablished'),
      messageReceived = require('./lib/messageReceived'),
      connectionEnded = require('./lib/connectionEnded');

(function() {
  const host = process.argv[2];
  const port = process.argv[3];

  if (!host || !port) {
    console.error('No Server and/or Port Specified');
    return;
  }

  const socket = net.createConnection({ host, port })
    .on('connect', () => connectionEstablished(socket))
    .on('data', (message) => messageReceived(message))
    .on('end', () => connectionEnded());
})();
