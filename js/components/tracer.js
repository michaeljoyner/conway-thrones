var Tracer = function(canvas, width, preview) {
	this.canvas = canvas;
	this.preview = preview;
	this.width = width || 200;
	this.rowWidth = null;
	this.listeningToFill = false;
	this.listeningToSpray = false;
}

Tracer.prototype = {

	init: function() {
		this.rowWidth = this.canvas.width/this.width;
		this.canvas.addEventListener('click', this.handleClick.bind(this), false);
		this.canvas.addEventListener('mousemove', this.drawLine.bind(this), false);
		document.body.addEventListener('keydown', this.handleKeyDown.bind(this), false);
		document.body.addEventListener('keyup', this.handleKeyUp.bind(this), false);
	},

	handleClick: function(ev) {
		var dotPos = this.getDotPos(ev);
		this.preview.setDot(dotPos.xPos, dotPos.yPos);
		this.preview.render();
	},

	handleKeyDown: function(ev) {
		if(ev.keyCode !== 68) return;
		this.listeningToFill = true;
		this.canvas.style.cursor = "crosshair";
	},

	handleKeyUp: function(ev) {
		if(ev.keyCode === 68) {
			this.listeningToFill = false;
			this.canvas.style.cursor = 'default';
		}
	},

	drawLine: function(ev) {
		if(! this.listeningToFill) return;

		var dotPos = this.getDotPos(ev);
		this.preview.fillDot(dotPos.xPos, dotPos.yPos);
		this.preview.render();
	},

	getDotPos: function(ev) {
		var clickedRow = Math.floor(ev.offsetX / this.rowWidth);
		var clickedCol = Math.floor(ev.offsetY / this.rowWidth);
		return {
			xPos: clickedRow,
			yPos: clickedCol
		};
	}
}

module.exports = Tracer;