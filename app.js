var express = require('express');
var app = express();
var dpath = require("path");
var path = __dirname + '/views/';
var session = require('express-session');
var mysql = require('mysql');
var routes = require('./routes');
var router = express.Router();
var user = require('./routes/user');
var bodyParser=require("body-parser");
var http = require('http');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'login_js'
});
connection.connect();
global.db = connection;

app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs');

app.use(express.static(dpath.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));

app.get('/', routes.index);//call for main index page
app.get('/register', user.signup);//call for signup page
app.post('/register', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile

app.listen(80,function(){
  console.log("Live at Port 80");
});