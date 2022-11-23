const { Router } = require('express')

const myuser = require('../controllers/user.controller');
const router = Router();

// Routes go here
router.get('/all', myuser.getAllUser);
router.get('/:id', myuser.getUser);
router.post('/create', myuser.createUser);
router.post('/delete', myuser.deleteUser);
router.post('/update/:id', myuser.updateUser);


module.exports = router;
