const bcrypt = require("bcryptjs")
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

// 05.test session and jwt
exports.getUsername = async (req, res) => {
    // 03：请从 Session 中获取用户的名称，响应给客户端
    //   if (!req.session.islogin) {//此处就进行了鉴权，看用户的cookie是否有我们之前发送给他的islogin字段。
    //     return res.send({ status: 1, msg: 'fail' })
    //   }
    //   res.send({
    //     status: 0,
    //     msg: 'success',
    //     username: req.session.user.username,
    //   })

    res.send({
        status: 200,
        message: '获取用户信息成功！',
        data: req.user, // 要发送给客户端的用户信息
    })
}

exports.getUserById = async (req, res) => {

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

exports.getUserByEmail = async (req) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({
            message: "You need to include a email find a user"
        });
    }

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the email ${email}`
        })
    }

    return user;
}

exports.createUser = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send({
            message: "You need to include a username and password and email create a user"
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


    let emailExists = await User.findOne({
        where: {
            email
        }
    });

    if (emailExists) {
        return res.status(400).send({
            message: `A user with the username ${email} already exists`
        })
    }

    try {
        let newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
            email,
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
