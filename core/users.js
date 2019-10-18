// const mongo = require('../config/mongoose');
const User = require('../db/models').User;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = require('../config/jwt').secretKey;
const jwt = require('jsonwebtoken');

function _register(req, res, next) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (user == null) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return next(err);
                }
                const newUser = new User(req.body);
                newUser.password = hash;
                newUser.password_confirm = hash;
                newUser.save((err, result) => {
                    if (err) {
                        return res.json({ err })
                    }
                    return res.json({ user: result })
                })
            })
        } else {
            res.json({
                err: 'Username is already taken !'
            })
        }
    })
}

function _login(req, res) {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
            return res.json({ err })
        } else if (!user) {
            return res.json({
                err: 'Username or password is incorrect'
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result === true) {
                req.session.user = user;
                jwt.sign({user}, secretKey, (err, token) => {
                    res.json({
                        user: user,
                        loggedIn: true,
                        token: token
                    })
                })
            } else {
                return res.json({
                    err: 'Username or password is incorrect'
                })
            }
        })
    })
}

function _logout(req, res) {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.json({ err });
            } else {
                return res.json({
                    logout: "Success"
                })
            }
        })
    }
}

module.exports = {
    register: _register,
    login: _login,
    logout: _logout
}