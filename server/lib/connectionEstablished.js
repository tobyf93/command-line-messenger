const   userUtils = require('./userUtils'),
        messageReceived = require('./message');

module.exports = connectionEstablished;

function connectionEstablished(socket) {
  addUser(socket);

  socket
    .on('data', (data) => messageReceived(socket, data))
    .on('close', () => removeUser(socket));
}

function addUser(socket) {
  localMessenger.users.push({
    name: undefined,
    socket
  });

  outputStats();
}

function removeUser(socket) {
  const index = userUtils.getUserIndex(socket);

  localMessenger.users = [
    ...localMessenger.users.slice(0, index),
    ...localMessenger.users.slice(index + 1)
  ];

  outputStats();
}

function outputStats() {
  console.log(`User Count: ${localMessenger.users.length}`);
  console.log(`Messages: ${localMessenger.messageLog.length}\n`);
}
