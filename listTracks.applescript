property g_stdout : {}
property field_delim : "\\"
property line_delim : "
"
on run argv
	set g_stdout to {}
	set stdout to a reference to g_stdout
	tell application "iTunes"
		set mySongs to get (every file track of playlist (item 1 of argv))
	end tell
	using terms from application "iTunes"
		repeat with a_track in mySongs
			tell a_track
				copy {database ID, field_delim, name, field_delim, album, field_delim, artist, field_delim, year, field_delim, bit rate, field_delim, time, line_delim} to the end of stdout
			end tell
		end repeat
		stdout as text
	end using terms from
	
end run
