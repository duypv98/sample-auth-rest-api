const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/users/me', verifyToken, userController.getUserInfo);

module.exports = router;
