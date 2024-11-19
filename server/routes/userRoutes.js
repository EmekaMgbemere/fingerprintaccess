const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/Usercontroller');


router.get('/users', UserController.Users);
router.post('/signupuser', UserController.Signupuser);
router.post('/login', UserController.Loginuser);
router.post('/logout', UserController.Logoutuser);
router.delete('/users/:id', UserController.Deleteuser);
router.get('/users/:id', UserController.Finduser);
router.put('/users/:id', UserController.Updateuser);

module.exports = router;