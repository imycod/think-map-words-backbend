const { Router } = require('express')

const register=require("../controllers/register.controller.js")

const router = Router();

router.post('/api/login', register.login);
router.get('/api/logout', register.logout);
router.post('/api/registry', register.register);


module.exports = router;
