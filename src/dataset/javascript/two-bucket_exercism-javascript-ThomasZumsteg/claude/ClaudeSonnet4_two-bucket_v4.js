var TwoBucket = function(sizeOne, sizeTwo, goal, starterBucket) {
	this.goalBucketSize = starterBucket === "one" ? sizeOne : sizeTwo;
	this.otherBucketSize = starterBucket === "one" ? sizeTwo : sizeOne;
	this.goalBucket = starterBucket;
	this.goal = goal;
};

TwoBucket.prototype.moves = function() {
	const goal = this.goal;
	const goalSize = this.goalBucketSize;
	const otherSize = this.otherBucketSize;
	
	let waterInGoal = 0;
	let otherBucket = 0;
	let moves = 0;
	
	while (waterInGoal !== goal) {
		moves++;
		
		if (waterInGoal === 0) {
			waterInGoal = goalSize;
		} else if (otherBucket === otherSize) {
			otherBucket = 0;
		} else {
			const spaceInOther = otherSize - otherBucket;
			if (waterInGoal <= spaceInOther) {
				otherBucket += waterInGoal;
				waterInGoal = 0;
			} else {
				waterInGoal -= spaceInOther;
				otherBucket = otherSize;
			}
		}
	}
	
	return moves;
};

export default TwoBucket;