set stdout to ""
tell application "iTunes"
	if player state of application "iTunes" is playing then
		set a_track to current track
		set stdout to stdout & (database ID of a_track) & "\\" & Â
			(name of a_track) & "\\" & Â
			(album of a_track) & "\\" & Â
			(artist of a_track) & "\\" & Â
			(year of a_track) & "\\" & Â
			(bit rate of a_track) & "\\" & Â
			(time of a_track) & "\\" & Â
			(duration of a_track) & "\\" & Â		 
			(player state of application "iTunes") & "\\" & Â
			(player position of application "iTunes") & "\\"
	else
		set stdout to stdout & (player state of application "iTunes")
	end if
end tell