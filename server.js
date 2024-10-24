require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const mongoose = require('./db/utils/connection');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.APP_PORT || 3000;

const routes = [
  'auth',
  'status',
  'user'
];

routes.forEach((route) => app.use(require(`./routes/${route}`)));

(async () => {
  try {
    await mongoose.connect();
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  } catch (e) {
    console.log(e);
  }
})();
