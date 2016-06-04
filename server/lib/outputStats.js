module.exports = outputStats;

function outputStats() {
  console.log(`User Count: ${localMessenger.users.length}`);
  console.log(`Messages: ${localMessenger.messageLog.length}\n`);
}
