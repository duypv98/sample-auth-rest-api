const mongoose = require('mongoose');
const chalk = require('chalk');
const dotenv = require('dotenv');

mongoose.Promise = global.Promise;
dotenv.config();

const connected = chalk.bold.green;
const error = chalk.bold.red;
const disconnected = chalk.bold.redBright;
const reconnected = chalk.bold.blue;
const terminated = chalk.bold.magenta;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const DB_NAME = process.env.DB_NAME;

mongoose.connection.on('connected', () => {
    console.log(connected('Connected'))
});
mongoose.connection.on('error', (err) => {
    console.log(error('An error has occured' + err))
});
mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Disconnected'))
});
mongoose.connection.on('reconnected', () => {
    console.log(reconnected('Reconnected'))
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(terminated('Connection is closed due to application termination'));
        process.exit(0);
    })
})

module.exports = {
    connect: async () => {
        await mongoose.connect('mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auth: {
                user: DB_USER,
                password: DB_PWD
            }
        });
    },
    defaultInstance: mongoose.connection
}
