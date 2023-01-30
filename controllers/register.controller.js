const userController = require('./user.controller.js')
const bcrypt = require("bcryptjs")

module.exports = {
    async login(req, res) {
        const user = await userController.getUserByEmail(req)
        // 判断用户提交的登录信息是否正确，此处写死一个账号密码校验，在实际开发中肯定是需要数据库匹配。
        if (req.body.email !== user.email || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.send({ status: 1, msg: '登录失败' })
        }
        // 02：请将登录成功后的用户信息，保存到 Session 中
        // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
        req.session.user = req.body // 用户的信息，我们将用户的信息转换成cookie字符串返回给用户。
        req.session.islogin = true // 用户的登录状态，也是我们鉴权的参考
        res.send({ status: 0, msg: '登录成功' })
    },
    logout(req, res) {
        // 04：清空 Session 信息
        req.session.destroy()
        res.send({
            status: 0,
            msg: '退出登录成功',
        })
    },
    register(req, res) {
        return userController.createUser(req, res)
    }
}