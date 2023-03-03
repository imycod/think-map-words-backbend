const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const fs = require('fs');
const helmet = require('helmet')
const expressjwt = require('express-jwt')

const app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './access.log'),
  { flags: 'a' }
);

const serverConfig=require("./config/server.config.js")
const network = require("./routes/network");
// app.use(expressjwt({ secret: serverConfig.secretKey }).unless({ path: [/^\/creator\//] }))

app.use(helmet());
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', routes.user);
app.use('/network', routes.network);
app.use('/register', routes.register);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
});

