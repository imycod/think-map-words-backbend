const db = require('../models');
const User = db.rest.models.user;

exports.getAllUser = async (req, res) => {
    const users = await User.findAll({ raw: true })
    
    if (!users) {
        return res.status(400).send({
            message: `No users found`
        })
    }

    return res.send(users);
}

exports.getUser = async (req, res) => {

    const { id } = req.params;


    const user = await User.findOne({
        where: {
            id
        }
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${id}`
        })
    }

    return res.send(user);

};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "You need to include a username and password create a user"
        });
    }

    let usernameExists = await User.findOne({
        where: {
            username
        }
    });

    if (usernameExists) {
        return res.status(400).send({
            message: `A user with the username ${username} already exists`
        })
    }

    try {
        let newUser = await User.create({
            username,
            password
        });
        return res.send(newUser);
    } catch (e) {
        return res.status(500).send({
            message: `Error: ${e.message}`
        });
    }
};

exports.updateUser = async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        return res.status(400).send({
            message: `No user exists with the id ${id}`
        })
    }

    try {
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }
        user.save();
        return res.send({
            message: `User ${id} has been updated`
        })
    } catch (e) {
        return res.status(500).send({
            message: `Error:${e.message}`
        })
    }


};

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({
            message: `Please provide the ID of user you are trying to delete`
        })
    }

    const user = await User.findOne({
        where: {
            id
        }
    });

    if (!user) {
        return res.status(400).send({
            message: `No user exists with the id ${id}`
        })
    }

    try {
        await user.destroy();
        return res.send({
            message: `User ${id} has been deleted`
        })
    } catch (e) {
        return res.status(500).send({
            message: `Error:${e.message}`
        })
    }


};
