const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users/user');
const userController = require ('../../controllers/userController');

router.get('/', userController.getUsers);
router.post('/',userController.createUser);
router.get('/:userId',userController.getUser);
router.put('/:userId',userController.updateUser);
router.delete('/:userId',userController.deleteUser);
module.exports = router;
