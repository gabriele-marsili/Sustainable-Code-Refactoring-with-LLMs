class TwoBucket {
	constructor(sizeOne, sizeTwo, goal, starterBucket) {
		this.goalBucketSize = starterBucket === "one" ? sizeOne : sizeTwo;
		this.otherBucketSize = starterBucket === "one" ? sizeTwo : sizeOne;
		this.goalBucket = starterBucket;
		this.goal = goal;
	}

	moves() {
		let waterInGoal = 0;
		let otherBucket = 0;
		let moves = 0;

		while (waterInGoal !== this.goal) {
			moves++;
			if (waterInGoal === 0) {
				waterInGoal = this.goalBucketSize;
			} else if (otherBucket === this.otherBucketSize) {
				otherBucket = 0;
			} else if (waterInGoal + otherBucket <= this.otherBucketSize) {
				otherBucket += waterInGoal;
				waterInGoal = 0;
			} else {
				waterInGoal -= this.otherBucketSize - otherBucket;
				otherBucket = this.otherBucketSize;
			}
		}

		return moves;
	}
}

export default TwoBucket;