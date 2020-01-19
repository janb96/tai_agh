const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let session = require('express-session');
const cors = require('cors');
let passport = require('passport');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 300000 },
    resave: true,
    rolling: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

let users = require('./models/users');
require('./config/auth/passport')(users);
require('./models/users');

var authRouter = require('./routes/api/auth.js');
var usersRouter = require('./routes/api/users.js');
var rolesRouter = require('./routes/api/roles.js');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);

module.exports = app;
