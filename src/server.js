const app = require("./app");

function startServer(port) {
  app.listen(port, () => {
    console.log(`Server start up on port ${port}!`);
  });
}

module.exports = startServer;
