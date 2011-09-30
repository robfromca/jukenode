set stdout to ""
tell application "iTunes"
	set allPlaylists to get every playlist
	repeat with plist in allPlaylists
		set stdout to stdout & (id of plist) & "\\" & (name of plist) & "
"
	end repeat
end tell
