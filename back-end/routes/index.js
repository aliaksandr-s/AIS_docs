const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl').AuthCtrl;
const UsersCtrl = require('../controllers/usersCtrl').UsersCtrl;
const DocumentsCtrl = require('../controllers/documentsCtrl').DocumentsCtrl;
const documentsCtrl = require('../controllers/documentsCtrl')


// auth routes
router.post('/login', AuthCtrl.login);

// users routes //// {{make them private later}}
router.get('/users', UsersCtrl.getUsers);
router.post('/users', UsersCtrl.addUser);

// documents routes
router.get('/documents', DocumentsCtrl.getAllDocuments);
router.get('/documents/:userId', DocumentsCtrl.getUserDocuments);
router.get('/documents/:userId/:docName', DocumentsCtrl.downloadDocument);
router.post('/documents', DocumentsCtrl.uploadDocument);

module.exports = router;