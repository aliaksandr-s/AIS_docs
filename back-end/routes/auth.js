const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/authCtrl').AuthCtrl;

// auth routes
router.post('/', AuthCtrl.login);

module.exports = router;