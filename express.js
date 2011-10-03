var express = require('express');

var sys = require('sys');

var queue = require('./queue.js');
var musicsource = require ('./itunes.js');

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

app.get('/status.json', function(req,res) {
    res.contentType('application/json');
    musicsource.status(function(data) {
	res.partial('status.jade', data)
    });
});

app.get('/status', function(req,res) {
    musicsource.status(function(data) {
	res.partial('status.jade', data)
    }, function(data) {
	res.partial('status.jade', data)
    });
});

app.get('/playlist/:name', function(req,res) {
    safe_playlist = req.params.name.replace(/[^A-Za-z-_0-9 \-]/g, "")
    musicsource.songs_in_playlist(safe_playlist, function(data) {
	debugger;
	res.render('songindex.jade', {locals: {
	    songs:data
	}});
    }, function(error_data) {
	res.render('error.jade', {locals: {error:error_data}});
    });
});

app.get('/playlists', function(req,res) {
    musicsource.all_playlists(function(data) {
	res.render('playlists.jade', {locals: {
	    playlists:data
	}});
    });
});

app.post('/play/:id', function(req, res) {
    safe_id = req.params.id.replace(/[^0-9]/g, "")
    musicsource.play(safe_id, function(data) {
	res.render('play.jade');
    }, function (error_data) {
	res.render('error.jade', {locals: {error:error_data}});
    });
});

app.post('/stop', function(req, res) {
    musicsource.pause(function(data) {
	res.render('play.jade');
    }, function (error_data) {
	res.render('error.jade', {locals: {error:error_data}});
    });
});
	      
app.get('/queue/add/:id', function(req, res) {
	queue.add(req.params.id);
	res.json("", 204);
});

app.get('/queue', function(req, res) {
	res.json(queue.contents());
});

app.get('/queue/random', function(req, res) {
	res.json(queue.random());
});

app.listen(4000);