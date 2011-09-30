var readFile = require('fs').readFile;
var writeFile = require('fs').writeFile;

var queue=exports;


var sys = require("sys");

var allSongs = [];

readFile("./data/queue.txt", function(err, data) {  allSongs = JSON.parse(data); });

queue.random = function() {
	var song = allSongs[Math.floor(Math.random()*allSongs.length)];
	return song;
}

queue.add = function(id) {
	allSongs.push(id);
	writeFile("data/queue.txt", JSON.stringify(allSongs));
}

queue.next = function() {
	song = allSongs.shift();
	writeFile("data/queue.txt", JSON.stringify(allSongs));
}

queue.contents = function() {
	return allSongs;
}