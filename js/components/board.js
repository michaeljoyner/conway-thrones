var Cell = require("./cell.js");
var stark = require("./stark.js");
var targaryan = require('./targaryan.js');
var lannister = require('./lannister.js');
var baratheon = require('./baratheon.js');
var greyjoy = require('./greyjoy.js');

function makeEmptyBoard() {
	var newBoard = [];
	var newColumn, state;
	var len = stark.length;
	for(var i = 0; i < this.rows; i++) {
		newColumn = [];
		for(var j = 0; j < this.columns; j++) {
			newColumn.push(new Cell(i, j, false));
		}
		newBoard.push(newColumn);
	}

	return newBoard;
}

var boardFactory = {
	rows: 200,

	columns: 200,

	makeBoard: function() {
		var newBoard = [];
		var newColumn, state;
		var len = stark.length;
		for(var i = 0; i < this.rows; i++) {
			newColumn = [];
			for(var j = 0; j < this.columns; j++) {
				// state = Math.random() > 0.5 ? true : false;
				state = (i === 112  && j == 111) || (i == 110 && j === 112) || (i == 112 && j === 112) || (i == 111 && j === 114) || (i == 112 && j === 115) || (i == 112 && j === 116) || (i == 112 && j === 117);
				newColumn.push(new Cell(i, j, state));
			}
			newBoard.push(newColumn);
		}

		return newBoard;
	},

	makeStarkBoard: function() {
		var board = boardFactory.makeEmptyBoard();
		var len = stark.length;

		for(var k = 0; k < len; k++) {
			board[stark[k].y][stark[k].x].revive();
		}

		return board;
	},

	makeTargaryanBoard: function() {
		var board = boardFactory.makeEmptyBoard();
		var len = targaryan.length;

		for(var k = 0; k < len; k++) {
			board[targaryan[k].y][targaryan[k].x].revive();
		}

		return board;	
	},

	makeLannisterBoard: function() {
		var board = boardFactory.makeEmptyBoard();
		var len = lannister.length;

		for(var k = 0; k < len; k++) {
			board[lannister[k].y][lannister[k].x].revive();
		}

		return board;	
	},

	makeBaratheonBoard: function() {
		var board = boardFactory.makeEmptyBoard();
		var len = baratheon.length;

		for(var k = 0; k < len; k++) {
			board[baratheon[k].y][baratheon[k].x].revive();
		}

		return board;
	},

	makeGreyjoyBoard: function() {
		var board = boardFactory.makeEmptyBoard();
		var len = greyjoy.length;

		for(var k = 0; k < len; k++) {
			board[greyjoy[k].y][greyjoy[k].x].revive();
		}

		return board;
	},



	makeEmptyBoard: function() {
		var newBoard = [];
		var newColumn, state;
		var len = stark.length;
		for(var i = 0; i < this.rows; i++) {
			newColumn = [];
			for(var j = 0; j < this.columns; j++) {
				newColumn.push(new Cell(i, j, false));
			}
			newBoard.push(newColumn);
		}

		return newBoard;
	}

}

module.exports = boardFactory;