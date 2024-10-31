const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessionController')


router.get(`/oauth/google`, googleOAuthHandler);

module.exports = router;