const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister } = require('../middleware/validation');

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

module.exports = router;