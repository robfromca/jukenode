var http = require('http');
var util = require('util'),
    exec = require('child_process').exec,
    child;

function runApplescriptFile(osascript, args, next) {
    commandLine = 'osascript ' + osascript + " '" + args + "'";
    exec(commandLine,
		     function(error, stdout, stderr) {
			 if (error !== null) {
			     next('NodeError: ' + error + "\nargs:[" + commandLine + "]");
			 } else {
			     next(stdout);
			 }
		     });
}

function runApplescript(osascript, inline, next) {
	child = exec('osascript -e \'tell application "iTunes"\' -e "' + osascript + '" -e "end tell"',
		     function (error, stdout, stderr) {
			 if (error !== null) {
			     next('NodeError: ' + error);
			 } else {
			     next(stdout);
			 }
		     });
}

http.createServer(function(request, response) {
    urldata = require('url').parse(request.url, true)
    response.writeHead(200, {'Content-Type': 'text/plain'});
    switch (urldata['pathname']) {
    case '/start':
	data = runApplescript('play', function(data) {
	    response.end(data);
	});
	break;
    case '/stop':
	data = runApplescript('pause', function(data) {
	    response.end(data);
	});
	break;
    case '/list':
	args = urldata['query']['name'];
	// sanitize input
	args = args.replace(/[^A-Za-z-_0-9 \-]/g, "")
	data = runApplescriptFile('listTracks.applescript', args, function(data) {
	    response.end(data);
	});
	break;
    }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');




