const net = require('net'),
      readline = require('readline'),
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

(function() {
  const port = process.argv[2];

  if (!port) {
    console.error('No Port Specified');
    return;
  }

  const socket = net.createConnection({ port })
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
