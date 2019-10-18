const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_KEY
module.exports = {
    secretKey: secretKey
}