const { Router } = require('express')

const Node = require('../controllers/node.controller');
const Edge = require('../controllers/edge.controller');
const router = Router();

router.post('/node/create', Node.createNode);
router.post('/node/update', Node.updateNode);
router.get('/node/:label', Node.findNodeByLabel);
router.get('/node/all', Node.findNodes);
router.get('/edge/all',Edge.findEdges)

module.exports = router;
