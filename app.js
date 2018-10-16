const path = require('path');

// 미들웨어 패키지 로드
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash');
const pug = require('pug');
const sass = require('node-sass-middleware');

// 보안 설정
// 참고: https://www.npmjs.com/package/dotenv#usage
require('dotenv').config();

// Express 프레임워크 패키지 로드
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// 템플릿 엔젠 & views, 포트 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', port);

// 미들웨어 설정
// Sass 설정
// 참고: https://github.com/sass/node-sass-middleware#express-example
app.use(sass({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix: '', // <link rel="stylesheets" href="{prefix}/style.css">
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));
app.use(flash());

// 라우트 설정
const indexRouter = require('./routes');

app.use('/', indexRouter);

// 오류 처리 미들웨어 설정
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

// 서버 구동
app.listen(port, () => {
  console.log(`http://localhost:${port}로 서버가 구동 되었습니다.`);
});