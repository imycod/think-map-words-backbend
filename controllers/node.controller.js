const db = require('../models');
const Nodes = db.rest.models.nodes;

exports.createNode = async (req, res) => {
    const {id, label, partId, value} = req.body;
    if (!partId || !value || !label) {
        return res.status(400).send({
            message: "You need to include a partId and value and label create a node"
        });
    }
    let nodenameExists = await Nodes.findOne({
        where: {
            value
        }
    });

    if (nodenameExists) {
        return res.status(400).send({
            message: `A user with the node ${value} already exists`
        })
    }

    try {
        let newNode = await Nodes.create({
            id,
            value,
            label,
            partId,
        });
        return res.send(newNode);
    } catch (e) {
        return res.status(500).send({
            message: `Error: ${e.message}`
        });
    }
}

exports.findNodeByLabel = async (req, res) => {
    const label = req.params.label;

    Nodes.findOne({
        where: {
            label: label,
        },
    }, (err, nodes) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.send({
            code: 0,
            result: nodes
        });
    });
}

exports.findNodes = async (req, res) => {
    Nodes.findAll()
        .then((nodes) => {
            res.send({
                code: 0,
                result: nodes
            });
        })
        .catch((err) => {
            console.error('Unable to find nodes:', err);
        });
}

exports.updateNode = async (req, res) => {
    const {id, label, partId, value} = req.body;
    Nodes.update(
        {id, label, partId, value},
        {
            where: {
                id: id,
            },
        }
    )
        .then((result) => {
            console.log(`${result[0]} rows updated.`);
        })
        .catch((err) => {
            console.error('Unable to update nodes:', err);
        });
}
