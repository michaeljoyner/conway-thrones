var boardFactory = require('./components/board.js');
var Game = require('./components/game.js');


window.Tracer = require('./components/tracer.js');
window.PicBuilder = require('./components/picbuilder.js');
window.ImageConverter = require('./components/imageconverter.js');

var GameController = {
	selectedBoard: null,
	animationFrame: null,
	game: null,
	currentHouse: 'stark',

	elems: {
		startBtn: document.querySelector('#startBtn'),
		stopBtn: document.querySelector('#stopBtn'),
		resetBtn: document.querySelector('#resetBtn'),
		myCanvas: document.querySelector('#myCanvas'),
		statCanvas: document.querySelector('#statCanvas'),
		houses: [
			document.querySelector('#stark'),
			document.querySelector('#targaryan'),
			document.querySelector('#lannister'),
			document.querySelector('#baratheon'),
			document.querySelector('#greyjoy')	
		]
		
	},

	init: function() {
		var i = 0, l = GameController.elems.houses.length;
		var gc = GameController;

		gc.elems.startBtn.addEventListener('click', gc.startGame.bind(this), false);
		gc.elems.stopBtn.addEventListener('click', gc.stopGame.bind(this), false);
		gc.elems.resetBtn.addEventListener('click', gc.resetBoard, false);

		for(i;i<l;i++) {
			gc.elems.houses[i].addEventListener('click', gc.selectBoard, false);
		}

		gc.selectedBoard = gc.selectBoardFromFamily(gc.currentHouse);
		gc.game = new Game(gc.elems.myCanvas, gc.selectedBoard, gc.elems.statCanvas);
		gc.game.drawBoard();
		gc.game.drawStats();

	},

	setupGame: function() {
		var gc = GameController;
		gc.game = new Game(gc.elems.myCanvas, gc.selectedBoard, gc.elems.statCanvas);
		gc.game.drawBoard();
		gc.game.drawStats();
	},

	tick: function() {
		GameController.game.doNextGeneration();
		GameController.game.drawBoard();
		GameController.game.updateStats();
		if(! GameController.game.gameOver) {
			GameController.animationFrame = window.requestAnimationFrame(GameController.tick);
		}
	},

	startGame: function() {
		GameController.game.gameOver = false;
		GameController.game.startTime = new Date();
		GameController.animationFrame = window.requestAnimationFrame(GameController.tick);
	},

	stopGame: function() {
		GameController.game.gameOver = false;
		window.cancelAnimationFrame(GameController.animationFrame);
	},

	resetBoard: function() {
		var gc = GameController;

		gc.stopGame();
		gc.selectedBoard = gc.selectBoardFromFamily(gc.currentHouse);

		gc.game = new Game(gc.elems.myCanvas, gc.selectedBoard, gc.elems.statCanvas);
		gc.game.drawBoard();
		gc.game.drawStats();
	},

	selectBoard: function(ev) {
		if(! GameController.game.gameOver) {
			GameController.stopGame();
		}

		var newHouse = ev.target.id;
		GameController.currentHouse = newHouse;
		GameController.selectedBoard = GameController.selectBoardFromFamily(newHouse);
		GameController.setupGame();
	},

	selectBoardFromFamily: function(newHouse) {
		var newBoard;
		switch(newHouse) {
			case "targaryan":
				newBoard = boardFactory.makeTargaryanBoard();
				break;
			case "baratheon":
				newBoard = boardFactory.makeBaratheonBoard();
				break;
			case "greyjoy":
				newBoard = boardFactory.makeGreyjoyBoard();
				break;
			case "lannister":
				newBoard = boardFactory.makeLannisterBoard();
				break;
			case "stark":
				newBoard = boardFactory.makeStarkBoard();
				break;
			default:
				newBoard = boardFactory.makeStarkBoard();
		}
		return newBoard;
	}
}

window.GameController = GameController;