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
    let goalBucketSize = this.starterBucket === 'one' ? this.sizeOne : this.sizeTwo;
    let otherBucketSize = this.starterBucket === 'one' ? this.sizeTwo : this.sizeOne;

    while (bucketOne !== this.goal && bucketTwo !== this.goal) {
        moves++;

        if (this.starterBucket === 'one') {
            if (bucketOne === 0) {
                bucketOne = this.sizeOne;
            } else if (bucketTwo === otherBucketSize) {
                bucketTwo = 0;
            } else {
                const pourAmount = Math.min(bucketOne, otherBucketSize - bucketTwo);
                bucketOne -= pourAmount;
                bucketTwo += pourAmount;
            }
        } else {
            if (bucketTwo === 0) {
                bucketTwo = this.sizeTwo;
            } else if (bucketOne === this.sizeOne) {
                bucketOne = 0;
            } else {
                const pourAmount = Math.min(bucketTwo, this.sizeOne - bucketOne);
                bucketTwo -= pourAmount;
                bucketOne += pourAmount;
            }
        }

        if (bucketOne === this.goal || bucketTwo === this.goal) {
            break;
        }
    }

    return moves;
};

export default TwoBucket;