const db = require('../models');
const Edges = db.rest.models.edges;

function findEdges(req, res) {
    Edges.findAll()
        .then((edges) => {
            res.send({
                code: 0,
                result: edges
            });
        })
        .catch((err) => {
            console.error('Unable to find edges:', err);
        });
}

module.exports = {
    findEdges,
}
