(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	};

var Board = SnakeGame.Board = function(){
	this.snake = new SnakeGame.Snake();
	this.apple = null;
};

// Board.prototype.render = function(){
// 	var row = "";
// 	for (var i = 0; i < 25; i++ ){
// 		row = "";
// 		for (var col = 0; col < 25; col++) {
// 			if (this.snake.segments.indexOf(i * 25 + col) !== -1) {
// 				row += "S";
// 			} else {
// 				row += ".";
// 			};
// 		}
// 		console.log(row);
// 		console.log(" ");
// 	};
// }

Board.prototype.generateApple = function() {
	if (this.snake.segments.indexOf(this.apple) !== -1){
		this.apple = null;
	}
	if (this.apple === null){
		var newApple = Math.floor(Math.random() * 625);
		while (this.snake.segments.indexOf(newApple) !== -1) {
			newApple = Math.floor(Math.random() * 625);
		};
		this.apple = newApple;
	};
};

})();
