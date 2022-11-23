const db = require('../models');
const Nodes = db.rest.models.nodes;

exports.createNode = async (req, res) => {
    const { category, value, name,x,y } = req.body;
    if (!category || !value || !name) {
        return res.status(400).send({
            message: "You need to include a category and value and name create a node"
        });
    }
    let nodenameExists = await Nodes.findOne({
        where: {
            name
        }
    });

    if (nodenameExists) {
        return res.status(400).send({
            message: `A user with the node ${name} already exists`
        })
    }

    try {
        let newNode = await Nodes.create({
            name,
            value,
            category,
            x,
            y,
        });
        return res.send(newNode);
    } catch (e) {
        return res.status(500).send({
            message: `Error: ${e.message}`
        });
    }
}