const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl.js');
const usersCtrl = require('../controllers/usersCtrl.js');
const documentsCtrl = require('../controllers/documentsCtrl')

// auth routes
router.post('/login', authCtrl.login);

// users routes //// {{make them private later}}
router.get('/users', usersCtrl.getUsers);
router.post('/users', usersCtrl.addUser);

// documents routes
router.post('/documents', documentsCtrl.uploadDocument)
router.get('/documents', documentsCtrl.downloadDocument)
router.get('/documents/:userId', documentsCtrl.getUserDocuments)

module.exports = router;