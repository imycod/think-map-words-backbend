/**
 * 1. cookie + session 是一种鉴权方案
 * https://juejin.cn/post/7068572077883654152
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const fs = require('fs');
const helmet = require('helmet')

// 01. session 
// const session = require('express-session')

// 01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const expressjwt = require('express-jwt')

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './access.log'),
  { flags: 'a' }
);

// 02. session 
// app.use(
//   session({
//     secret: 'imycode_1w2x2s2',//此处的secret密钥可以是任意字符串，是你自己制定的专属加密方案，此处笔者将以自己的名字为例
//     resave: false,//无需在意，但是要写上
//     saveUninitialized: true,//无需在意，但是要写上
//   })
// )
// 02：定义 secret 密钥，建议将密钥命名为 secretKey
const serverConfig=require("./config/server.config.js")
// 04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
// unless指定哪些接口不需要访问权限，即白名单。
app.use(expressjwt({ secret: serverConfig.secretKey }).unless({ path: [/^\/register\//] }))

app.use(helmet());
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', routes.user);
app.use('/node', routes.node);
app.use('/register', routes.register);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.status(err.status || 500);
  res.render('error');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
});

