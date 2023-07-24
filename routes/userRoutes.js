const express = require('express');
const { signUp, login, logout, refreshAccessToken,requestPasswordReset, resetPassword  } = require('../controllers/userControllers');
const  authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route('/users/register').post(signUp);
router.route('/users/login').post(login);
router.get('/users/logout', logout); // Use "users/logout" instead of just "logout"
router.post('/users/refresh-token', refreshAccessToken); // New route for refreshing access token

// New routes for password reset
router.post('/users/request-password-reset', requestPasswordReset);
router.post('/users/reset-password', resetPassword);

// router.route('/getCurrentUser').get(authMiddleware,getCurrentUser);

module.exports = router;
