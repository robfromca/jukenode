var q = [];

exports.add = function(itunesId) {
	q.push(itunesId);
};

exports.next = function() {
	return q.shift();
};

exports.all = function() {
	return q;
};