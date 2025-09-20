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
        this.bucketOneSize = bucketOneSize;
        this.bucketTwoSize = bucketTwoSize;
        this.goal = goal;
        this.goalBucket = starterBucket;
        this.starterBucket = 0;
        this.otherBucket = 0;
    }
    moves() {
        let count = 0;
        let starterBucketSize = this.goalBucket === Bucket.One ? this.bucketOneSize : this.bucketTwoSize;
        let otherBucketSize = this.goalBucket === Bucket.One ? this.bucketTwoSize : this.bucketOneSize;
        let starterBucket = 0;
        let otherBucket = 0;
        while (starterBucket !== this.goal) {
            count++;
            if (starterBucket === 0) {
                starterBucket = starterBucketSize;
            }
            else if (otherBucket === otherBucketSize) {
                otherBucket = 0;
            }
            else {
                const spaceInOtherBucket = otherBucketSize - otherBucket;
                if (spaceInOtherBucket < starterBucket) {
                    otherBucket = otherBucketSize;
                    starterBucket -= spaceInOtherBucket;
                }
                else {
                    otherBucket += starterBucket;
                    starterBucket = 0;
                }
            }
        }
        return count;
    }
}
exports.TwoBucket = TwoBucket;
