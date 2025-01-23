const express = require('express');
const router = express.Router();
const { login, createUser, changePassword, forgotPassword, resetPassword } = require('../controllers/Admin/authController');
const { authorizeRoles, isAuthenticatedUser } = require('../middlewar/auth');


router.post('/users', createUser);


router.post('/admin-login', login);

// Welcome Route (Protected)
router.get('/', isAuthenticatedUser, authorizeRoles('Admin'), (req, res) => {
    res.status(200).json({ message: "Welcome to the admin panel" });
});


router.put('/password/change', isAuthenticatedUser,authorizeRoles('Admin'), changePassword);

// router.post('/password/forgot', forgotPassword);

// router.put('/password/reset/:token', resetPassword);

module.exports = router;
