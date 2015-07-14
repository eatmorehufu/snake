(function(){
	if (typeof SnakeGame === "undefined"){
		window.SnakeGame = {};
	};

var View = SnakeGame.View = function(board, $el) {
	this.board = board;
	this.$game = $el;
	this.setup();
	this.bindKeys();
	this.interval = window.setInterval(this.step.bind(this), 100);
};


View.prototype.setup = function(){
	this.$game.append("<ul class='grid'>");
	for (var i = 0; i < 625; i++){
		this.$game.find('.grid').append("<li></li>");
	};
	var $game = this.$game;
	this.board.snake.segments.forEach(function(element){
		$($game.find('li')[element]).addClass("snake");
	});
};

View.prototype.bindKeys = function() {
	$(document).on("keydown", function(event){
		if (event.keyCode === 38) {
			this.board.snake.turn('N');
			this.board.snake.canTurn = false;
		};
		if (event.keyCode === 37) {
			this.board.snake.turn('W');
			this.board.snake.canTurn = false;
		}
		if (event.keyCode === 39) {
			this.board.snake.turn('E');
			this.board.snake.canTurn = false;
		}
		if (event.keyCode === 40) {
			this.board.snake.turn('S');
			this.board.snake.canTurn = false;
		};
	}.bind(this))
}

View.prototype.step = function (){
	if (this.board.snake.hitSelf() || this.board.snake.hitEdge()){
		this.gameOver();
	} else {
		this.board.generateApple();
		this.board.snake.move(this.board.apple);
		this.iterateLife();
		this.draw();
	};
};

View.prototype.gameOver = function (){
	window.clearInterval(this.interval);
	this.$game.append("<h1>Game Over!</h1>");
}

View.prototype.draw = function() {
	this.$game.find('.snake').removeClass("snake");
	this.$game.find('.apple').removeClass("apple");
	var segments = this.board.snake.segments
	$(this.$game.find('li')[this.board.apple]).addClass("apple");
	for (var i = 0; i < segments.length; i++ ) {
		$(this.$game.find('li')[segments[i]]).addClass("snake")
	}
};

View.prototype.iterateLife = function() {
	var liveCells = this.board.liveStep();
	this.$game.find('.life').removeClass("life");
	for (var i = 0; i < liveCells.length; i++ ){
		$(this.$game.find('li')[liveCells[i]]).addClass("life");
	}
}


})();
