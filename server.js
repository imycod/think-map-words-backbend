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
const fs=require('fs');
const helmet=require('helmet')
const session = require('express-session')

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './access.log'),
  {flags: 'a'}
);

app.use(
  session({
    secret: 'imycode_1w2x2s2',//此处的secret密钥可以是任意字符串，是你自己制定的专属加密方案，此处笔者将以自己的名字为例
    resave: false,//无需在意，但是要写上
    saveUninitialized: true,//无需在意，但是要写上
  })
)
app.use(helmet());
app.use(logger('combined',{stream: accessLogStream}));
app.use(express.json({limit:'50mb'}));
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', routes.user);
app.use('/node', routes.node);
app.use('/register', routes.register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
});

