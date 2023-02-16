require('dotenv').config();
require('@babel/register');

const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');

const { PORT, SESSION_SECRET } = process.env;

const app = express();

const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const regRoutes = require('./routes/regRoutes');
const checkAuthRoutes = require('./routes/checkAuthUserRoutes');
const recordsRoutes = require('./routes/recordsRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const documentsRoutes = require('./routes/documentsRoutes');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));
app.use(fileUpload());

const sessionConfig = {
  name: 'NameCookie',
  store: new FileStore(),
  secret: SESSION_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  next();
});

app.use('/login', loginRoutes);
app.use('/register', regRoutes);
app.use('/check-auth-user', checkAuthRoutes);
app.use('/records', recordsRoutes);
app.use('/logout', logoutRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/reports', reportsRoutes);
app.use('/documents', documentsRoutes);

app.listen(PORT ?? 3600, () => {
  console.log(`Сервер запущен! ${PORT}`);
});
