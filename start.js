var http = require('http');
var util = require('util'),
    exec = require('child_process').exec,
    child;

function runApplescript(osascript, inline, next) {
    if (inline) {
	child = exec('osascript -e \'tell application "iTunes"\' -e "' + inline + '" -e "end tell"',
		     function (error, stdout, stderr) {
			 if (error !== null) {
			     data =  'Error: ' + error;
			 } else {
			     data = stdout;
			 }
			 next(data);
		     });
    } else {
	child = exec('osascript ' + osascript,
		     function(error, stdout, stderr) {
			 if (error !== null) {
			     data =  'Error: ' + error;
			 } else {
			     data = stdout;
			 }
			 next(data);
		     });
    }
}

http.createServer(function(request, response) {
    urldata = require('url').parse(request.url, true)
    response.writeHead(200, {'Content-Type': 'text/plain'});
    switch (urldata['pathname']) {
    case '/start':
	runApplescript('play', false, response.write);
	response.end('Started\n')
	break;
    case '/stop':
	runApplescript('pause', false, response.write);
	response.end('Stopping\n')
	break;
    case '/list':
	runApplescript('listTracks.scpt', true, response.write);
	response.end('Listed');
	break;
    }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');




