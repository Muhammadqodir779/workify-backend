const express = require('express');
const router = express.Router();
const talentController = require('../controllers/talent.controller');

// 🟢 Register
router.post('/talent/register', talentController.createTalent);

// 🟢 Login
router.post('/talent/login', talentController.loginTalent);

module.exports = router;
