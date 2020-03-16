const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.Promise = global.Promise;

const {
  DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME
} = process.env;

const logs = {
  connected: chalk.bold.green,
  error: chalk.bold.red,
  disconnected: chalk.bold.redBright,
  reconnected: chalk.bold.blue,
  terminated: chalk.bold.magenta
};


mongoose.connection.on('connected', () => {
  console.log(logs.connected('Connected'));
});
mongoose.connection.on('error', (err) => {
  console.log(logs.error(`An error has occured${err}`));
});
mongoose.connection.on('disconnected', () => {
  console.log(logs.disconnected('Disconnected'));
});
mongoose.connection.on('reconnected', () => {
  console.log(logs.reconnected('Reconnected'));
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(logs.terminated('Connection is closed due to application termination'));
    process.exit(0);
  });
});

module.exports = {
  connect: () => mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: DB_USER,
      password: DB_PWD,
    },
  }),
  defaultInstance: mongoose.connection,
};
