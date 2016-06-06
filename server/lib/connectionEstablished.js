const   users = require('./users'),
        message = require('./message');

module.exports = connectionEstablished;

function connectionEstablished(socket) {
  users.add(socket);
  message.emitLogs(socket);

  socket
    .on('data', (data) => message.received(socket, data.toString()))
    .on('close', () => users.remove(socket));
}
