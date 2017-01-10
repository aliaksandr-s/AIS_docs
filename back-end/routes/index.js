const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl.js');
const usersCtrl = require('../controllers/usersCtrl.js');
const docsCtrl = require('../controllers/docsCtrl');

router.post('/login', authCtrl.login);

router.post('/users', usersCtrl.addUser);

router.post('/users/docs', docsCtrl.addDoc);

module.exports = router;