var neighborCheckerGenerator = {

	generate: function(board) {
		var cellList = [];
		for(var i = 0; i < board.length; i++) {
			for(var j =0; j < board[i].length; j++) {
				cellList.push(board[i][j].isAlive ? 1 : 0);
			}
		}
		return {
			ancestors: cellList,

			getNeighborCount: function(position, rowLength) {
				// return Math.round(Math.random() * 8);
				var count = 0;
				var neighborPos;

				function isInFirstCol() {
					if(position === 0) {
						return true;
					}
					if(position === 1) {
						return false;
					}
					return ((position)%(rowLength) === 0); 
				}

				function isInLastCol() {
					if(position === 0) {
						return false;
					}
					return (position + 1)%(rowLength) === 0; 
				}

				function isInFirstRow() {
					return position < rowLength;
				}

				function isInLastRow() {
					return position >=cellList.length - rowLength;
				}
				if(! isInFirstCol()) {
					if(position !== 0) {
						count += cellList[position-1];
					}
				}
				if(! isInLastCol()) {
					count += cellList[position+1];
				}
				if(! isInFirstRow() && ! isInFirstCol()) {
					count += cellList[position - rowLength -1];
				}
				if(! isInFirstRow()) {
					count += cellList[position - rowLength];
				}
				if(! isInFirstRow() && ! isInLastCol()) {
					count += cellList[position - rowLength +1];
				}
				if(! isInLastRow() && !isInFirstCol()) {
					count += cellList[position + rowLength -1];
				}
				if(! isInLastRow()) {
					count += cellList[position + rowLength];
				}
				if(! isInLastRow() && ! isInLastCol()) {
					count += cellList[position + rowLength +1];
				}

				return count;
			} 
		};
	}
}

module.exports = neighborCheckerGenerator;