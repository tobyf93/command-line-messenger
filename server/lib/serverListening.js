module.exports = serverListening;

function serverListening(server) {
  const address = server.address();
  console.log('Started server: %j', address);
}
