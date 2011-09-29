var http = require('http');
var util = require('util'),
    exec = require('child_process').exec,
    child;

function runApplescript(osascript, inline, next) {
    if (inline) {
	child = exec('osascript -e \'tell application "iTunes"\' -e "' + osascript + '" -e "end tell"',
		     function (error, stdout, stderr) {
			 if (error !== null) {
			     next('NodeError: ' + error);
			 } else {
			     next(stdout);
			 }
		     });
    } else {
	child = exec('osascript ' + osascript,
		     function(error, stdout, stderr) {
			 if (error !== null) {
			     next('NodeError: ' + error);
			 } else {
			     next(stdout);
			 }
		     });
    }
}

function endResponse(response, data) {
    response.end(data);
}

http.createServer(function(request, response) {
    urldata = require('url').parse(request.url, true)
    response.writeHead(200, {'Content-Type': 'text/plain'});
    switch (urldata['pathname']) {
    case '/start':
	data = runApplescript('play', true, function(data) {
	    response.end(data);
	});
	break;
    case '/stop':
	data = runApplescript('pause', true, function(data) {
	    response.end(data);
	});
	break;
    case '/list':
	data = runApplescript('listTracks.scpt', false, function(data) {
	    response.end(data);
	});
	break;
    }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');




