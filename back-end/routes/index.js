const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl.js');
const usersCtrl = require('../controllers/usersCtrl.js');

router.post('/login', authCtrl.login);

router.post('/users', usersCtrl.addUser);

module.exports = router;