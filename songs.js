var songs = [
    {
	id: 1,
	name: "Breathe"
    },
    {
	id: 2,
	name: "October"
    },
    {
	id: 3,
	name: "Friday"
    }
];

module.exports.all = songs;

module.exports.find = function(id) {
    debugger;
    id = parseInt(id, 10);
    var found = null;
    songloop: for (index in songs) {
	var song = songs[index];
	if (song.id == id) {
	    found = song;
	    break songloop;
	}
    };
    return found;
}