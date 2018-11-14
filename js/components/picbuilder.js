var PicBuilder = function(canvas, size) {
	var newCol;
	var newBoard = [];
	this.canvas = canvas;
	this.size = size;
	this.grid = [];
	for(var i = 0;i< size;i++) {
		newCol = [];
		for(var j = 0; j < size; j++) {
			newCol.push(false);
		}
		newBoard.push(newCol);
	}
	this.grid = newBoard;
}

PicBuilder.prototype = {

	setDot: function(x, y) {
		this.grid[x][y] = ! this.grid[x][y];
	},

	fillDot: function(x, y) {
		this.grid[x][y] = true;
	},

	maybeFillDot: function(x, y) {
		this.grid[x][y] = Math.random() > 0.5;
	},

	getDotList: function() {
		var dotList = [];
		for(var x = 0; x < 200; x++) {
			for(var y = 0; y < 200; y++) {
				if(this.grid[x][y]) {
					dotList.push({xPos: x, yPos: y});
				}
			}
		}
		return dotList;
	},

	render: function() {
		var rowWidth = this.canvas.width/this.size;
		var radius = rowWidth/2;
		var ctx = this.canvas.getContext('2d');
		var colour = "#FF0000";

		ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

		for(var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				if(this.grid[i][j]) {
					ctx.beginPath();
			        ctx.arc(i*rowWidth+rowWidth/2, j*rowWidth+rowWidth/2, radius, 0, 2 * Math.PI, false);
			        ctx.fillStyle = colour;
			        ctx.fill();
			        ctx.closePath();	
				}
			}
		}
	}
}

module.exports = PicBuilder;