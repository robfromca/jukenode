var util = require('util'),
    exec = require('child_process').exec,
    child;

var musicsource = exports;

function runApplescriptFile(osascript, args, next, error_func) {
    commandLine = 'osascript ' + osascript + " '" + args + "'";
    exec(commandLine, { maxBuffer: 1000*1024}, 
		     function(error, stdout, stderr) {
			 if (error !== null) {
			     error_func('NodeError: ' + error + "\nargs:[" + commandLine + "]");
			 } else {
			     next(stdout);
			 }
		     });
}

function runApplescript(osascript, next, next, error_func) {
    exec('osascript -e \'tell application "iTunes"\' -e "' + osascript + '" -e "end tell"', { maxBuffer: 1000*1024 },
		     function (error, stdout, stderr) {
			 if (error !== null) {
			     error_func('NodeError: ' + error);
			 } else {
			     next(stdout);
			 }
		     });
}

musicsource.play = function(id, next, error) {
    playstring = 'play (every track whose database ID is ' + safe_id + ')';
    runApplescript(playstring, next, error);
}

musicsource.pause = function(next, error) {
    playstring = 'pause';
    runApplescript(playstring, next, error);
}

musicsource.status = function(next, error) {
    runApplescriptFile('status.applescript', '', function(data) {
	if (!data.match(/\\playing\\/)) {
	    status = {playerstate:"paused"};
	} else {
	    item = data.split('\\');
	    status = 
		{id:item[0],
		 name:item[1],
		 album:item[2],
		 artist:item[3],
		 year:item[4],
		 bitrate:item[5],
		 runningtime:item[6],
		 duration:item[7],
		 playerstate:item[8],
		 playerposition:item[9]
		};
	}
	next(status);
    }, function(error_data) {
	error(error_data);
    });
}

musicsource.all_playlists = function(next, error) {
    runApplescriptFile('listPlaylists.applescript', '', function(data) {
	lists = [];
	data.split('\n').forEach(function(line_item) {
	    item = line_item.split('\\');
	    lists.push(
		{id:item[0],
		 name:item[1]
		});
	});
	next(lists);
    }, function(error_data) {
	error(error_data);
    });
}

musicsource.songs_in_playlist = function(id, next, error) {
    runApplescriptFile('listTracks.applescript', id, function(data) {
	debugger;
	songlist = [];
	data.split('\n').forEach(function(line_item) {
	    item = line_item.split('\\');
	    songlist.push(
		{id:item[0],
		 name:item[1],
		 album:item[2],
		 artist:item[3],
		 year:item[4],
		 bitrate:item[5],
		 runningtime:item[6],
		 duration:item[7]
		});
	});
	next(songlist);
    }, function(error_data) {
	error(error_data);
    });

}

