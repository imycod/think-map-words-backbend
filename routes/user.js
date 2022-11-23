const { Router } = require('express')

const myuser = require('../controllers/user.controller');
const router = Router();

// Routes go here
router.get('/:id', myuser.getUser);
router.post('/create', myuser.createUser);
router.post('/update/:id', myuser.updateUser);
router.post('/delete', myuser.deleteUser);


module.exports = router;
