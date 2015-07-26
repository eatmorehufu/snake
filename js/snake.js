(function(){
		if (typeof SnakeGame === "undefined"){
			window.SnakeGame = {};
		}

		var Snake = SnakeGame.Snake = function (board){
			this.board = board;
			this.dir = 'N';
			this.segments = [312, 337, 362];
			this.segmentsToAdd = 0;
		};

		Snake.prototype.reset = function(){
			this.segments = [312, 337, 362];
			this.segmentsToAdd = 0;
			this.dir = 'N';
		}

		Snake.prototype.move = function (apple) {
			var newSpace = this.testMove();
			this.segments.unshift(newSpace);
			if (newSpace === apple ){
				this.spawnLife();
				this.spawnLife();
				this.segmentsToAdd += 3;
			} else if (this.segmentsToAdd > 0){
				this.segmentsToAdd -= 1;
			} else {
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
					!(eastWest.indexOf(this.dir) !== -1 && eastWest.indexOf(dir) !== -1)
				 ) {
				this.dir = dir;
				var snake = this;
			};
		};

		Snake.prototype.spawnLife = function () {
			for (var i = 0; i < this.segments.length; i++) {
				if (this.board.life.indexOf(this.segments[i]) === -1) {
					this.board.life.push(this.segments[i]);
				}
			}
		}

})();
