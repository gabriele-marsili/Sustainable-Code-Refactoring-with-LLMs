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
        this.starterBucket = 0;
        this.otherBucket = 0;
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
        let count = 0;
        while (this.starterBucket !== this.goal) {
            if (this.starterBucket === 0) {
                this.starterBucket = this.starterBucketSize;
            }
            else if (this.otherBucket === this.otherBucketSize) {
                this.otherBucket = 0;
            }
            else {
                const transferAmount = Math.min(this.starterBucket, this.otherBucketSize - this.otherBucket);
                this.otherBucket += transferAmount;
                this.starterBucket -= transferAmount;
            }
            count++;
        }
        return count;
    }
}
exports.TwoBucket = TwoBucket;
