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
  }

  const client = net.createConnection({ port })
    .on('connect', () => {
      const address = client.address();
      console.log('Connected To Server: %j', address);

      rl.question('> ', (answer) => {
        client.write(answer);
        rl.close();
      });
    })
    .on('data', (data) => {
      console.log(`received: ${data}`);
    })
    .on('end', () => {
      console.log('Disconnected From Server');
    });
})();
