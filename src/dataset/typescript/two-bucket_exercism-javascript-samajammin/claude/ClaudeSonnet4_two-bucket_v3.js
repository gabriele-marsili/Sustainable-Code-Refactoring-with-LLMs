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
        this.starterBucket = 0;
        this.otherBucket = 0;
    }
    moves() {
        if (this.goal === 0)
            return 0;
        if (this.goal === this.starterBucketSize)
            return 1;
        let count = 0;
        let starter = 0;
        let other = 0;
        const starterSize = this.starterBucketSize;
        const otherSize = this.otherBucketSize;
        const target = this.goal;
        while (starter !== target) {
            if (starter === 0) {
                starter = starterSize;
            }
            else if (other === otherSize) {
                other = 0;
            }
            else {
                const transfer = Math.min(starter, otherSize - other);
                starter -= transfer;
                other += transfer;
            }
            count++;
        }
        this.starterBucket = starter;
        this.otherBucket = other;
        return count;
    }
}
exports.TwoBucket = TwoBucket;
