const { Router } = require('express')

const userController = require('../controllers/user.controller');
const router = Router();

// Routes go here
router.get('/all', userController.getAllUser);
router.get('/username', userController.getUsername);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.post('/delete', userController.deleteUser);
router.post('/update/:id', userController.updateUser);


module.exports = router;
