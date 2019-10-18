const express = require('express');
const router = express.Router();
// const verifyToken = require('../helpers/jwt').verifyToken;
const secretKey = require('../config/jwt').secretKey;
const jwt = require('jsonwebtoken');

router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err);
        } else {
            res.json({
                method: "POST",
                message: "Post request is created. Here is its response",
                data: authData
            });
        }
    });
});

function verifyToken (req, res, next) {
    //Get Auth Header Value
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        //Fobbiden
        res.sendStatus(403);
    }
}
module.exports = router;