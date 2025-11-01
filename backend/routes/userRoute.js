const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')


router.get('/get-all-users/', userController.getAllUsers);
router.get('/get-user/:id', userController.getUser);

router.post('/get-user-by-email/', userController.getUserByEmail);
router.post('/create-user/', userController.createUser);
router.post('/login/', userController.loginUser);


module.exports = router