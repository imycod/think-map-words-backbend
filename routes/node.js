const { Router } = require('express')

const mynode = require('../controllers/node.controller');
const router = Router();

// Routes go here
router.post('/create', mynode.createNode);
router.get('/findall', mynode.findAll);


module.exports = router;
