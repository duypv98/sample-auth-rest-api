const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.defaultInstance
    })
}))
app.use('/api', require('./routes/index'));


const startApp = async (port) => {
    await mongoose.connect();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

startApp(process.env.APP_PORT);
