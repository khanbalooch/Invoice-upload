var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var invoicesRouter = require('./routes/invoices');

var app = express();


const db= require('./database/database');
db.sequelize.sync();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/invoices', invoicesRouter);

module.exports = app;
