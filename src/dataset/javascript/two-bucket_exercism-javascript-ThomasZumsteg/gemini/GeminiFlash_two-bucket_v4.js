var TwoBucket = function(sizeOne, sizeTwo, goal, starterBucket) {
	this.goalBucketSize = (starterBucket === "one" ? sizeOne : sizeTwo);
	this.otherBucketSize = (starterBucket === "one" ? sizeTwo : sizeOne);
	this.goalBucket = starterBucket;
	this.goal = goal;
};

TwoBucket.prototype.moves = function() {
	let waterInGoal = 0;
	let otherBucket = 0;
	let moves = 0;

	while (waterInGoal !== this.goal) {
		moves++;

		if (waterInGoal === 0) {
			waterInGoal = this.goalBucketSize;
		} else if (otherBucket === this.otherBucketSize) {
			otherBucket = 0;
		} else {
			const pourAmount = Math.min(waterInGoal, this.otherBucketSize - otherBucket);
			otherBucket += pourAmount;
			waterInGoal -= pourAmount;
		}
	}

	return moves;
};

export default TwoBucket;