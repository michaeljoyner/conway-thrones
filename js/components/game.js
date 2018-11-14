var ancestorGenerator = require('./neighborcheckergenerator');

var Game = function(canvas, board, statCanvas) {
	this.canvas = canvas;
	this.canvasSize = canvas.width;
	this.board = board;
	this.statCanvas = statCanvas;
	this.deadColour = "#6FCCE2";
	this.aliveColours = ["#FCC446", "#FF7455"];
	this.generations = 0;
	this.living = 0;
	this.stableGenerations = 0;
	this.gameOver = false;
	this.startTime = '0:00';
}

Game.prototype = {

	doNextGeneration: function() {
		var pos, neighborCount, cell;
		var ancestorChecker = ancestorGenerator.generate(this.board);
		var livingCount = 0;

		for(var i = 0; i < this.board.length; i++) {
			for(var j = 0; j < this.board[i].length; j++) {
				cell = this.board[i][j];
				pos = i*this.board.length + j;
				neighborCount = ancestorChecker.getNeighborCount(pos, this.board[i].length);
				if(!cell.isAlive && neighborCount === 3) {
					cell.revive();
				}
				if(cell.isAlive) {
					if(neighborCount < 2 || neighborCount > 3) {
						cell.kill();
					}
				}
				if(cell.isAlive) {
					livingCount += 1;
				}
			}
		}

		this.generations += 1;
		if(this.living === livingCount) {
			if(this.stableGenerations >= 10) {
				this.gameOver = true;
			} else {
				this.stableGenerations += 1;
			}
		} else {
			this.stableGenerations = 0;
		}
		this.living = livingCount;
	},

	drawBoard: function() {
		var colour;
		this.canvas.width = this.canvasSize;
		this.canvas.height = this.canvasSize;

		var rowWidth = this.canvasSize/this.board.length;
		var radius = rowWidth/2;

		var ctx = this.canvas.getContext('2d');
		ctx.clearRect(0,0,this.canvasSize,this.canvasSize);
		
		for(var k = 0; k < this.board.length; k++) {
			for(var l = 0; l < this.board[k].length; l++) {
				if(this.board[k][l].isAlive) {
					colour = this.aliveColours[(Math.round(Math.random()*this.aliveColours.length))];
					ctx.beginPath();
			        ctx.arc(l*rowWidth+rowWidth/2, k*rowWidth+rowWidth/2, radius, 0, 2 * Math.PI, false);
			        ctx.fillStyle = colour;
			        ctx.fill();
			        ctx.closePath();	
				}
				
			}
		}
	},

	drawStats: function() {

		var colour1 = "#FF7455";
		var colour2 = "#FCC446";
		var headColour = "#FFFFFF";
		var headFont = "72px monospace";
		var font2 = "40px monospace";
		var font1 = "18px 'Roboto', sans-serif";
		var ctx = this.statCanvas.getContext('2d');
		ctx.clearRect(0,0, 600, 120);
		ctx.fillStyle =colour1;
		ctx.font = font1;
		ctx.fillText("Living Cells", 10, 20);
		ctx.fillText("Generations", 210, 20);
		ctx.fillText("Time", 420, 20);
		ctx.font = font2;
		ctx.fillStyle = colour2;
		ctx.fillText(this.living, 10, 70);
		ctx.fillText(this.generations, 210, 70);
		ctx.fillText('0.00', 420, 70)
		
	},

	updateStats: function() {
		var ctx = this.statCanvas.getContext('2d');
		var colour2 = "#FCC446";
		var font2 = "40px monospace";
		ctx.clearRect(10, 40, 250, 99);
		ctx.clearRect(210, 40, 250, 99);
		ctx.clearRect(420, 40, 250, 99);
		ctx.font = font2;
		ctx.fillStyle = colour2;
		ctx.fillText(this.living, 10, 70);
		ctx.fillText(this.generations, 210, 70);
		ctx.fillText(this.getRunningTime(), 420, 70);
	},

	getRunningTime: function() {
		var now = new Date();
		return +((now - this.startTime)/1000).toFixed(2);
	}
}

module.exports = Game;