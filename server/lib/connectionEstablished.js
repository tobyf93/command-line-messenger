module.exports = connectionEstablished;

function connectionEstablished(socket) {
  sockets.push(socket);
  console.log(`sockets: ${sockets.length}`);

  socket
    .on('data', (message) => emitMessage(message))
    .on('close', () => removeSocket(socket));
}

function emitMessage(message) {
  sockets.forEach((socket) => {
    socket.write(message);
  });
}

function removeSocket(socket) {
  const index = sockets.indexOf(socket);
  sockets = [...sockets.slice(0, index), ...sockets.slice(index + 1)];
  console.log(`sockets: ${sockets.length}`);
}
