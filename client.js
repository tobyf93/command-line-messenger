const net = require('net'),
      readline = require('readline'),
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

(function() {
  const host = process.argv[2];
  const port = process.argv[3];

  if (!host || !port) {
    console.error('No Server and/or Port Specified');
    return;
  }

  const socket = net.createConnection({ host, port })
    .on('connect', () => {
      const address = socket.address();
      console.log('Connected To Server: %j', address);

      (function prompt() {
        rl.question('', (answer) => {
          socket.write(answer);
          prompt();
        });
      })();
    })
    .on('data', (data) => {
      console.log(`> ${data.toString()}`);
    })
    .on('end', () => {
      console.log('Disconnected From Server');
    });
})();
