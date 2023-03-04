const db = require('../models');
const Edges = db.rest.models.edges;

function findEdges(req, res) {
    Edges.findAll()
        .then((edges) => {
            res.send({
                code: 200,
                result: edges
            });
        })
        .catch((err) => {
            console.error('Unable to find edges:', err);
        });
}

async function createEdges(req,res) {
    const {to,from,id}=req.body
    if (!to || !from || !id) {
        return res.status(400).send({
            message: "请输入边的信息"
        });
    }
    let exists = await Edges.findOne({
        where: {
            id
        }
    });

    if (exists) {
        return res.status(400).send({
            message: `这条边 ${id} 已经存在了`
        })
    }

    try {
        let newEdge = await Edges.create(req.body);
        return res.send({
            code:200,
            result: newEdge
        });
    } catch (e) {
        return res.status(500).send({
            message: `Error: ${e.message}`
        });
    }
}

module.exports = {
    findEdges,
    createEdges,
}
