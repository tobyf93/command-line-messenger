const net = require('net');

(function() {
  const server = net.createServer()
    .on('listening', () => {
      const address = server.address();
      console.log('Started server: %j', address);
    })
    .on('connection', () => {
      console.log('CONNECTION MADE!!!!');
    })
    .on('error', (err) => {
      throw err;
    });

  server.listen();
})();
