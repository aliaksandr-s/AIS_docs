const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl').AuthCtrl;
const UsersCtrl = require('../controllers/usersCtrl').UsersCtrl;
const documentsCtrl = require('../controllers/documentsCtrl')


// auth routes
router.post('/login', AuthCtrl.login);

// users routes //// {{make them private later}}
router.get('/users', UsersCtrl.getUsers);
router.post('/users', UsersCtrl.addUser);

// documents routes
router.post('/documents', documentsCtrl.uploadDocument)
router.get('/documents', documentsCtrl.getAllDocuments)
router.get('/documents/:userId', documentsCtrl.getUserDocuments)
router.get('/documents/:userId/:docName', documentsCtrl.downloadDocument)

module.exports = router;