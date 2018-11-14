var Cell = function(row, col, isAlive) {
	this.row = row;
	this.col = col;
	this.isAlive = !!(isAlive);
}

Cell.prototype = {
	kill: function() {
		this.isAlive = false;
	},

	revive: function() {
		this.isAlive = true;
	}
}

module.exports = Cell;