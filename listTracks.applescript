on run argv
	set stdout to ""
	tell application "iTunes"
		set mySongs to get (every track of playlist (item 1 of argv))
		repeat with a_track in mySongs
			set stdout to stdout & (database ID of a_track) & "\\" & Â
				(name of a_track) & "\\" & Â
				(album of a_track) & "\\" & Â
				(artist of a_track) & "\\" & Â				
				(year of a_track) & "\\" & Â
				(bit rate of a_track) & "\\" & Â
				(time of a_track) & "\\" & Â
				"
"
		end repeat
	end tell
end run
