module.exports = connectionEstablished;

function connectionEstablished(socket) {
  addUser(socket);
  socket
    .on('data', (message) => messageReceived(socket, message))
    .on('close', () => removeSocket(socket));
}

function addUser(socket) {
  users.push({
    name: undefined,
    socket
  });

  console.log(`Users: ${users.length}`);
}

function findUser(socket) {
  for (var i in users) {
    var user = users[i];
    if (user.socket === socket) {
      return user;
    }
  }
}

function getUserIndex(socket) {
  for (var i in users) {
    var user = users[i];
    if (user.socket === socket) {
      return i;
    }
  }
}

function messageReceived(socket, message) {
  const user = findUser(socket);

  if (!user.name) {
    user.name = message;
  } else {
    emitMessage(user.name, message);
  }
}

function emitMessage(userName, message) {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  users.forEach((user) => {
    user.socket.write(`[${time}] ${userName} | ${message}`);
  });
}

function removeSocket(socket) {
  const index = getUserIndex(socket);
  users = [...users.slice(0, index), ...users.slice(index + 1)];
  console.log(`Users: ${users.length}`);
}
