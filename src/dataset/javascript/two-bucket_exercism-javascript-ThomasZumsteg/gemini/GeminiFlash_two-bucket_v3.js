var TwoBucket = function(sizeOne, sizeTwo, goal, starterBucket) {
	this.sizeOne = sizeOne;
	this.sizeTwo = sizeTwo;
	this.goal = goal;
	this.starterBucket = starterBucket;
};

TwoBucket.prototype.moves = function() {
	let moves = 0;
	let bucketOne = 0;
	let bucketTwo = 0;
	let goalBucketSize = this.starterBucket === "one" ? this.sizeOne : this.sizeTwo;
	let otherBucketSize = this.starterBucket === "one" ? this.sizeTwo : this.sizeOne;
	let firstBucket = this.starterBucket === "one" ? "one" : "two";

	while (bucketOne !== this.goal && bucketTwo !== this.goal) {
		moves++;

		if (firstBucket === "one") {
			if (bucketOne === 0) {
				bucketOne = goalBucketSize;
			} else if (bucketTwo === otherBucketSize) {
				bucketTwo = 0;
			} else {
				const pourAmount = Math.min(bucketOne, otherBucketSize - bucketTwo);
				bucketTwo += pourAmount;
				bucketOne -= pourAmount;
			}
		} else {
			if (bucketTwo === 0) {
				bucketTwo = goalBucketSize;
			} else if (bucketOne === otherBucketSize) {
				bucketOne = 0;
			} else {
				const pourAmount = Math.min(bucketTwo, otherBucketSize - bucketOne);
				bucketOne += pourAmount;
				bucketTwo -= pourAmount;
			}
		}

		if (bucketOne === this.goal || bucketTwo === this.goal) {
			break;
		}

		if (moves > this.sizeOne * this.sizeTwo) {
			return Infinity;
		}
	}

	return moves;
};

export default TwoBucket;