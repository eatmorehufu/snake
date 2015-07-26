(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	};

var Board = SnakeGame.Board = function(){
	this.snake = new SnakeGame.Snake(this);
	this.apple = null;
	this.life = [];
};

Board.NABES = {
	topLeft: - 26,
	topCenter: -25,
	topRight: -24,
	middleLeft: -1,
	middleRight: 1,
  bottomLeft: 24,
	bottomCenter: 25,
	bottomRight: 26
}

Board.prototype.generateApple = function(apple) {
	if (this.snake.segments.indexOf(apple) !== -1){
		apple = null;
	}
	if (apple === null){
		var newApple = Math.floor(Math.random() * 625);
		while (this.snake.segments.indexOf(newApple) !== -1 || newApple === 625) {
			newApple = Math.floor(Math.random() * 625);
		};
		apple = newApple;
	};

	return apple;
};

Board.prototype.togglePause = function() {
	if (this.paused) {
		this.paused = false;
	} else {
		this.paused = true;
	}
}

Board.prototype.restart = function() {
	this.snake.reset();
	this.apple = null;
	this.over = false;
	$(".game-over").empty();
}

Board.prototype.liveStep = function() {
	var activeSq = this.activeSquares();
	var nextLife = [];
	for (var i = 0; i < activeSq.length; i++ ) {
		if (this.life.indexOf(activeSq[i]) !== -1) {
			if (this.countAdjacentLiveSquares(activeSq[i]) === 2) {
				nextLife.push(activeSq[i]);
			}
		};
		if (this.countAdjacentLiveSquares(activeSq[i]) === 3) {
			nextLife.push(activeSq[i]);
		};
	};


	this.life = nextLife;
	return nextLife;
};

Board.prototype.activeSquares = function() {
	var activeSq = [].concat(this.life);
	for (var i = 0; i < this.life.length; i++ ){
		var adjSq = this.adjacentSquares(this.life[i]);
		for (var j = 0; j < adjSq.length; j++ ){
			if (activeSq.indexOf(adjSq[j]) === -1) {
				activeSq.push(adjSq[j]);
			}
		}
	}

	return activeSq;
};

Board.prototype.countAdjacentLiveSquares = function(square) {
	var adjSq = this.adjacentSquares(square);
	var liveSqCt = 0;
	for (var i = 0; i < adjSq.length; i++) {
		if (this.life.indexOf(adjSq[i]) !== -1) {
			liveSqCt++;
		}
	}

	return liveSqCt;
};

Board.prototype.adjacentSquares = function(square) {
	var adjSq = [];
	var dirs = [];
	if (square < 25 ) {
		if (square === 0){
			dirs = ["middleRight", "bottomCenter", "bottomRight"];
		} else if (square === 24) {
			dirs = ["middleLeft", "bottomLeft", "bottomCenter"];
		} else {
			dirs = [
				"middleLeft",
				"bottomLeft",
				"bottomCenter",
				"bottomRight",
				"middleRight"
			];
		}
	} else if (square >= 600) {
		if (square === 600) {
			dirs = ["middleRight", "topCenter", "topRight"];
		} else if (square === 624) {
			dirs = ["middleLeft", "topLeft", "topCenter"];
		} else {
			dirs = [
				"middleLeft",
				"topLeft",
				"topCenter",
				"topRight",
				"middleRight"
			];
		}
	} else if (square % 25 === 0) {
		dirs = ["middleRight", "topRight", "bottomRight"];
	} else if (square % 25 === 24) {
		dirs = ["middleLeft", "topLeft", "bottomLeft"];
	} else {
		dirs = Object.keys(Board.NABES)
	};
	for (var i = 0; i < dirs.length; i++) {
		adjSq.push(square + Board.NABES[ dirs[i] + "" ])
	}

	return adjSq;
};

})();
