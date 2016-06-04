const userUtils = require('./userUtils');

module.exports = messageReceived;

function messageReceived(socket, message) {
  const user = userUtils.findUser(socket);

  if (!user.name) {
    user.name = message;
    emitLogs(socket);
  } else {
    emitToAll(user.name, message);
  }
}

function emitToAll(userName, message) {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  message = `[${time}] ${userName} | ${message}`;

  logMessage(message);
  localMessenger.users.forEach((user) => {
    user.socket.write(message);
  });
}

function emitLogs(socket) {
  localMessenger.messageLog.forEach((message) => {
    socket.write(`${message}\n`);
  });
}

function logMessage(message) {
  localMessenger.messageLog.push(message);
}
