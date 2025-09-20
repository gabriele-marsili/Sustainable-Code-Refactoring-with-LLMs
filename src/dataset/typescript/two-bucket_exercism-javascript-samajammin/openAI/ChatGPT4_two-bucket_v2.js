"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = exports.Bucket = void 0;
var Bucket;
(function (Bucket) {
    Bucket["One"] = "one";
    Bucket["Two"] = "two";
})(Bucket || (exports.Bucket = Bucket = {}));
class TwoBucket {
    constructor(bucketOneSize, bucketTwoSize, goal, starterBucket) {
        this.goalBucket = starterBucket;
        this.goal = goal;
        if (starterBucket === Bucket.One) {
            this.starterBucketSize = bucketOneSize;
            this.otherBucketSize = bucketTwoSize;
        }
        else {
            this.starterBucketSize = bucketTwoSize;
            this.otherBucketSize = bucketOneSize;
        }
    }
    moves() {
        let starterBucket = 0;
        let otherBucket = 0;
        let count = 0;
        while (starterBucket !== this.goal && otherBucket !== this.goal) {
            if (starterBucket === 0) {
                starterBucket = this.starterBucketSize; // Fill starter bucket
            }
            else if (otherBucket === this.otherBucketSize) {
                otherBucket = 0; // Empty other bucket
            }
            else {
                const transferAmount = Math.min(starterBucket, this.otherBucketSize - otherBucket);
                otherBucket += transferAmount;
                starterBucket -= transferAmount;
            }
            count++;
        }
        return count;
    }
}
exports.TwoBucket = TwoBucket;
