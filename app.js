'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fb = require('node-firebird');
var templating = require('consolidate');

//var index = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
            //'lat' : 45.000,

app.get('/', require('./models/firebird').get);

app.get('/mainReq', require('./models/firebird').get);

app.get('/history', function(req, res, next) {
	res.render('history', {date: new Date()});
});

app.get('/request', require('./models/firebird').get);

app.get('/test', function(req, res, next){
	res.render('index', {title: "Test", data: new Date()});
});

app.get(/^\/.*/i, function(req, res, next){
	res.render('error', {
		errNum: "404",
		errMessage: "Page not found"
	});
});

app.listen(3000, function(){
  console.log('Server listeninig on port 3000');
});

module.exports = app;

