// In each generator function you need a few things
// Something defining when the next block is being generated
// Something defining which and when the next function is going to be passed

function waveGen(clock) {
	var now = Date.now();
	this.lastGen = now;
	this.last = now;
	this.nextGen = 1500; // - 1500; //delay before starting
	this.start = now;
	this.colors = colors;
	this.ct = 0;
	this.clock = clock;
	this.difficulty = 0;
	this.integerDifficulty = this.difficulty;
	
	this.update = function() {
		this.computeDifficulty();
		this.currentFunction();
		if (Date.now() - this.lastGen > this.nextGen) {
			if (this.nextGen > 1000) {
				if (this.integerDifficulty < 8) {
					this.nextGen -=  20 * ((this.nextGen)/1100);
				}
				else {
					this.nextGen -=  10 * ((this.nextGen)/1100);
				}
			}
		}
	};

	this.randomGeneration = function() {
		var now = Date.now();
		if (now - this.lastGen > this.nextGen) {
			this.ct++;
			this.lastGen = now;
			var fv = randInt(0, 6);
			addNewBlock(fv, colors[randInt(0, colors.length)], 1.2 + (this.integerDifficulty/15) * 3);
			if (this.ct > 5) {
				var nextPattern = randInt(0, 20 + 4);
				if (nextPattern > 4 + 17) {
					this.ct = 0;
					this.currentFunction = this.doubleGeneration;
				} else if (nextPattern > 4 + 14) {
					this.ct = 0;
					this.currentFunction = this.crosswiseGeneration;
				} else if (nextPattern > 4 + 11) {
					this.ct = 0;
					this.currentFunction = this.spiralGeneration;
				}
				else if (nextPattern > 4 + 8) {
					this.ct = 0;
					this.currentFunction = this.circleGeneration;
				}
			}

		}
	};

	this.computeDifficulty = function() {
		if (this.difficulty < 15) {
			if (this.difficulty < 8) {
				this.difficulty += (Date.now() - this.last)/5000; // every 5 seconds raise the difficulty
			}
			else {
				this.difficulty += (Date.now() - this.last)/10000;
			}
		}
		this.integerDifficulty = Math.floor(this.difficulty);
	};

	this.circleGeneration = function() {
		var now = Date.now();
		if (now - this.lastGen > this.nextGen + 500) {
			var numColors = randInt(0, 4);
			if (numColors == 3) {
				numColors = randInt(0, 4);
			}

			var colorList = [];
			nextLoop:
			for (var i = 0; i < numColors; i++) {
				var q = randInt(0, colors.length);
				for (var j in colorList) {
					if (colorList[j] == colors[q]) {
						i--;
						continue nextLoop;
					}
				}
				colorList.push(colors[q]);
			}

			for (var i = 0; i < 6; i++) {
				addNewBlock(i, colorList[i % numColors], 1.2 + (this.integerDifficulty/15) * 3);
			}
			this.ct += 15;
			
			this.lastGen = now;
			this.shouldGoBackToRandom();
		}
	};

	this.crosswiseGeneration = function() {
		var now = Date.now();
		if (now - this.lastGen > this.nextGen + 300) {
			var ri = randInt(0, colors.length);
			var i = randInt(0, colors.length);
			addNewBlock(i, colors[ri], 0.6 + (this.integerDifficulty/15) * 3);
			addNewBlock((i + 3) % 6, colors[ri], 0.6 + (this.integerDifficulty/15) * 3);
			this.ct += 1.5;
			
			this.lastGen = now;
			this.shouldGoBackToRandom();
		}
	};

	this.spiralGeneration = function() {
		var now = Date.now();
		if (now - this.lastGen > this.nextGen/2) {
			addNewBlock(this.ct % 6, colors[randInt(0, colors.length)], 1.2 + (this.integerDifficulty/15) * (3/2));
			this.ct += 1;
			
			this.lastGen = now;
			this.shouldGoBackToRandom();
		}
	};

	this.doubleGeneration = function() {
		var now = Date.now();
		if (now - this.lastGen > this.nextGen) {
			var i = randInt(0, colors.length);
			addNewBlock(i, colors[randInt(0, colors.length)], 1.2 + (this.integerDifficulty/15) * 3);
			addNewBlock((i + 1) % 6, colors[randInt(0, colors.length)], 1.2 + (this.integerDifficulty/15) * 3);
			this.ct += 2;
			
			this.lastGen = now;
			this.shouldGoBackToRandom();
		}
	};

	this.setRandom = function() {
		this.ct = 0;
		debugger;
		this.currentFunction = this.randomGeneration;
	};

	this.shouldGoBackToRandom = function() {
		if (this.ct > 8) {
			if (randInt(0, 2) === 0) {
				debugger;
				this.setRandom();
				return 1;
			}
		}

		return 0;
	};

	// rest of generation functions

	this.currentFunction = this.randomGeneration;
}

function generatorFunction() {
	
}

// In each generator function you need a few things
// Something defining when the next block is being generated
// Something defining which and when the next function is going to be passed