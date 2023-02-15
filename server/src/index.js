require('dotenv').config();
require('@babel/register');
// const path = require('path');

const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');

const { PORT, SESSION_SECRET } = process.env;

const app = express();

// const indexRoutes = require('./routes/indexRoutes');

const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const regRoutes = require('./routes/regRoutes');
const checkAuthRoutes = require('./routes/checkAuthUserRoutes');
const recordsRoutes = require('./routes/recordsRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
// const aboutRoutes = require('./routes/aboutRoutes');
// const pricingRoutes = require('./routes/pricingRoutes');
// const contactsRoutes = require('./routes/contactsRoutes');
// const servicesRoutes = require('./routes/servicesRoutes');

const documentsRoutes = require('./routes/documentsRoutes');
// const taxesRoutes = require('./routes/taxesRoutes');

// const itemsRoutes = require('./routes/itemsRoutes');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));
app.use(fileUpload());
// const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
// console.log('🚀 ~ uploadsDir', uploadsDir);

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
  // console.log('req.session=>>>', req.session);

  next();
});

// app.use('/', indexRoutes);

app.use('/login', loginRoutes);
app.use('/register', regRoutes);
app.use('/check-auth-user', checkAuthRoutes);
app.use('/records', recordsRoutes);
app.use('/logout', logoutRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/reports', reportsRoutes);
// app.use('/about', aboutRoutes);
// app.use('/pricing', pricingRoutes);
// app.use('/contacts', contactsRoutes);
// app.use('/services', servicesRoutes);

app.use('/documents', documentsRoutes);
// app.use('/taxes', taxesRoutes);

// app.use('/mydocuments', mydocumentsRoutes);
// app.use('/items', itemsRoutes);

// app.post('/documents', async (req, res) => {
//   const userId = req.session?.userId;
//   console.log('===', req.files);

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('Ни один файл не был загружен.');
//   }
//   const sampleFile = req.files.doc;
//   const filename = new Date().getTime() + '_' + sampleFile.name;
//   console.log('🚀 ~ filename', filename);

//   sampleFile.mv(uploadsDir + '/' + filename, function (err) {
//     if (err) {
//       console.log('🚀 ~ err', err);
//       return res.status(500).send(err);
//     }
//     console.log('Файл загружен!');
//     res.redirect('/documents');
//   });
// });

app.listen(PORT ?? 3600, () => {
  console.log(`Сервер запущен! ${PORT}`);
});
