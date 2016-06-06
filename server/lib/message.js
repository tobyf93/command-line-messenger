const localMessenger = require('./localMessenger'),
      users = require('./users');

module.exports = {
  received,
  emitLogs
};

function received(socket, message) {
  const user = users.find(socket);

  if (!user.name) {
    user.name = message.toUpperCase();
    emitUserJoined(user.name);
  } else {
    emitMessage(user.name, message);
  }
}

function emitUserJoined(userName) {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  message = `[${time}] ${userName} JOINED THE CHAT`;

  emitToAll(message);
}

function emitMessage(userName, message) {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  message = `[${time}] ${userName} | ${message}`;

  logMessage(message);
  emitToAll(message);
}

function emitToAll(message) {
  var users = localMessenger.getUsers();
  users.forEach((user) => {
    user.socket.write(message);
  });
}

function emitLogs(socket) {
  var messageLog = localMessenger.getMessageLog();
  messageLog.forEach((message) => {
    socket.write(`${message}\n`);
  });
}

function logMessage(message) {
  localMessenger.logMessage(message);
}
