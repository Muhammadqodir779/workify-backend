const express = require('express');
const router = express.Router();
const talentController = require('../controllers/talent.controller');

router.post('/talent/register', talentController.createTalent);

module.exports = router;
