"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = void 0;
class TwoBucket {
    constructor(bucketOne, bucketTwo, goal, starterBucket) {
        this.bucketOneSize = bucketOne;
        this.bucketTwoSize = bucketTwo;
        this.goal = goal;
        this.starterBucket = starterBucket;
        this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one';
        this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one';
        this.bucketOne = 0;
        this.bucketTwo = 0;
    }
    moves() {
        if (this.starterBucket === this.largeBucket) {
            return this.solve(this.largeBucket, this.smallBucket, this.bucketSizes[this.largeBucket], this.bucketSizes[this.smallBucket]);
        }
        else {
            return this.solve(this.smallBucket, this.largeBucket, this.bucketSizes[this.smallBucket], this.bucketSizes[this.largeBucket]);
        }
    }
    solve(firstBucketName, secondBucketName, firstBucketSize, secondBucketSize) {
        let moves = 0;
        let firstBucket = 0;
        let secondBucket = 0;
        while (firstBucket !== this.goal && secondBucket !== this.goal) {
            if (firstBucket === 0) {
                firstBucket = firstBucketSize;
                moves++;
            }
            else if (secondBucket === secondBucketSize) {
                secondBucket = 0;
                moves++;
            }
            else {
                const pourAmount = Math.min(firstBucket, secondBucketSize - secondBucket);
                firstBucket -= pourAmount;
                secondBucket += pourAmount;
                moves++;
            }
        }
        this.bucketOne = firstBucketName === 'one' ? firstBucket : secondBucket;
        this.bucketTwo = firstBucketName === 'two' ? firstBucket : secondBucket;
        return moves;
    }
    get bucketSizes() {
        return { one: this.bucketOneSize, two: this.bucketTwoSize };
    }
    get goalBucket() {
        if (this.bucketOne === this.goal)
            return 'one';
        return 'two';
    }
    get otherBucket() {
        return this.goalBucket === 'one' ? this.bucketTwo : this.bucketOne;
    }
}
exports.TwoBucket = TwoBucket;
