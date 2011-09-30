var express = require('express');

var app = express.createServer();

app.configure(function() {
    app.use(express.logger());
    app.use(express.errorHandler({
	dumpExceptions:true,
	showTack:true
    }));
    app.use(express.static(__dirname + '/static'));
});

app.set('views', __dirname + '/views');

var songs = require('./songs');

app.get('/', function(request, response) {
    response.render('root.jade');
});

app.get('/songs', function(req,res) {
    res.render('songindex.jade', {locals: {
	songs:songs.all
    }});
});

app.get('/song/:id', function(req, res) {
    debugger;
    res.render('songdetail.jade', {locals: {
	song:songs.find(req.params.id)
    }});
});
	      

app.listen(4000);