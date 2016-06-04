const   users = require('./users'),
        messageReceived = require('./message');

module.exports = connectionEstablished;

function connectionEstablished(socket) {
  users.add(socket);

  socket
    .on('data', (data) => messageReceived(socket, data))
    .on('close', () => users.remove(socket));
}
