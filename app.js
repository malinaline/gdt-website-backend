var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//const mongoose = require('mongoose');
//require('dotenv/config');

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
//MongoClient.connect("mongodb+srv://gdtUser:<gdtUserPassword>@cluster0.fjhzd.mongodb.net/users?retryWrites=true&w=majority", {
    useUnifiedTopology: true
})
.then(client => {
   console.log("vi är uppkopplade mot databasen");
    const db = client.db("users");
    app.locals.db = db;

})


//CONECT TO DB
//mongoose.connect(
 process.env.DB_CONNECTION,
 {useNewUrlParse: true },

  //'mongodb+srv://gdtUser:gdtUserPassword@cluster0.fjhzd.mongodb.net/users?retryWrites=true&w=majority', 
 // () => 
//console.log('connected to db')
//);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
