const db = require('../models');
const Nodes = db.rest.models.nodes;

exports.createNode = async (req, res) => {
    const {value,label,id}=req.body
    if (!value || !label || !id) {
        return res.status(400).send({
            message: "请输入需包含单词的id和单词"
        });
    }
    let exists = await Nodes.findOne({
        where: {
            value
        }
    });

    if (exists) {
        return res.status(400).send({
            message: `这个单词 ${value} 已经存在了`
        })
    }

    try {
        let newNode = await Nodes.create(req.body);
        return res.send({
            code:200,
            result: newNode
        });
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
      try {
        const nodes = await Nodes.findAll();
        console.log('nodes----',nodes);
        res.send({
            code: 200,
            result: nodes
        });
    } catch (err) {
        console.error('Unable to find nodes:', err);
    }
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
