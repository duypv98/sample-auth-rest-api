const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../core/users');

function requiresLogout(req, res, next) {
    if (req.session && req.session.user) {
        return res.json({
            err: 'You must be logout in to login continue'
        })
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.json({ err: 'You must be logged in to view this page.' });
    }
}


router.post('/register', register);
router.post('/login', requiresLogout, login);
router.get('/logout', requiresLogin, logout);

module.exports = router;