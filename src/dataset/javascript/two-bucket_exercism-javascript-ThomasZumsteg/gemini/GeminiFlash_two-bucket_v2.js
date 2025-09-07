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
    let firstBucket = this.starterBucket === 'one' ? 1 : 2;

    while (bucketOne !== this.goal && bucketTwo !== this.goal) {
        moves++;

        if (firstBucket === 1) {
            if (bucketOne === 0) {
                bucketOne = this.sizeOne;
            } else if (bucketTwo === this.sizeTwo) {
                bucketTwo = 0;
            } else {
                const pourAmount = Math.min(bucketOne, this.sizeTwo - bucketTwo);
                bucketTwo += pourAmount;
                bucketOne -= pourAmount;
            }
        } else {
            if (bucketTwo === 0) {
                bucketTwo = this.sizeTwo;
            } else if (bucketOne === this.sizeOne) {
                bucketOne = 0;
            } else {
                const pourAmount = Math.min(bucketTwo, this.sizeOne - bucketOne);
                bucketOne += pourAmount;
                bucketTwo -= pourAmount;
            }
        }

        if (bucketOne === this.goal || bucketTwo === this.goal) {
            break;
        }
    }

    return moves;
};

export default TwoBucket;