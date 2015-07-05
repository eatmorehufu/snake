(function(){
		if (typeof SnakeGame === "undefined"){
			window.SnakeGame = {};
		}

		var Snake = SnakeGame.Snake = function (){
			this.dir = 'N';
			this.segments = [312, 337, 362];
		};

		Snake.prototype.move = function (apple) {
			var newSpace = this.testMove();
			this.segments.unshift(newSpace);
			if (newSpace !== apple){
					this.segments.pop();
				}
			this.canTurn = true;
		};

		Snake.prototype.hitEdge = function() {
			if (this.dir === 'N' && this.segments[0] < 25) {
				return true;
			} else if (this.dir === 'S' && this.segments[0] > 599) {
				return true;
			} else if (this.dir === 'W' && this.segments[0] % 25 === 0) {
				return true;
			} else if (this.dir === 'E' && this.segments[0] % 25 === 24) {
				return true;
			}

			return false;
		}

		Snake.prototype.hitSelf = function() {
			return this.segments.indexOf(this.testMove()) !== -1;
		}

		Snake.prototype.testMove = function(){
			var newSpace = null;
			if (this.dir === 'N') {
				newSpace = this.segments[0] - 25;
			} else if (this.dir === 'S') {
				newSpace = this.segments[0] + 25;
			} else if (this.dir === 'W') {
				newSpace = this.segments[0] - 1;
			} else if (this.dir === 'E') {
				newSpace = this.segments[0] + 1;
			};
			return newSpace;
		}

		Snake.prototype.turn = function(dir) {
			var northSouth = ['N', 'S'];
			var eastWest = ['E', 'W'];
			if (
					!(northSouth.indexOf(this.dir) !== -1 && northSouth.indexOf(dir) !== -1) &&
					!(eastWest.indexOf(this.dir) !== -1 && eastWest.indexOf(dir) !== -1) &&
					this.canTurn
				 ) {
				this.canTurn = false;
				this.dir = dir;
				console.log("snake can't turn now!");
				var snake = this;
				window.setTimeout(function(){
					console.log("snake can turn again!");
					snake.canTurn = true;
				}, 50);
			};
		};

		SnakeGame.Coord = {
			plus: function(){

			},
			equals: function () {

			},
			isOpposite: function () {

			}
		};



})();
