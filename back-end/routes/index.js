const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl.js');
const usersCtrl = require('../controllers/usersCtrl.js');
const documentCtrl = require('../controllers/documentCtrl')

// auth routes
router.post('/login', authCtrl.login);

// users routes //// {{make them private later}}
router.post('/users', usersCtrl.addUser);
router.get('/users', usersCtrl.getUsers);

// documents routes
router.post('/document', documentCtrl.addDocument)

module.exports = router;