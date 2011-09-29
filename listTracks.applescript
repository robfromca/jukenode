on run argv
	set stdout to ""
	tell application "iTunes"
		set mySongs to get (every track of playlist (item 1 of argv))
		repeat with a_track in mySongs
			set stdout to stdout & name of a_track & "
"
		end repeat
	end tell
end run
