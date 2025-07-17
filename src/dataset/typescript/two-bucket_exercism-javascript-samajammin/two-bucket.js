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
        if (this.goalBucket === Bucket.One) {
            this.starterBucketSize = bucketOneSize;
            this.otherBucketSize = bucketTwoSize;
        }
        else {
            this.starterBucketSize = bucketTwoSize;
            this.otherBucketSize = bucketOneSize;
        }
        this.goal = goal;
        this.starterBucket = 0;
        this.otherBucket = 0;
    }
    moves() {
        let count = 0;
        while (this.goal !== this.starterBucket) {
            // if starterBucket is empty, fill it
            if (this.starterBucket === 0) {
                this.starterBucket += this.starterBucketSize;
            }
            else if (this.otherBucket === this.otherBucketSize) {
                // if otherBucket is full, dump it
                this.otherBucket = 0;
            }
            else {
                // fill otherBucket with starterBucket
                const otherBucketCapacity = this.otherBucketSize - this.otherBucket;
                if (otherBucketCapacity < this.starterBucket) {
                    this.otherBucket = this.otherBucketSize;
                    this.starterBucket -= otherBucketCapacity;
                }
                else {
                    this.otherBucket += this.starterBucket;
                    this.starterBucket = 0;
                }
            }
            count++;
        }
        return count;
    }
}
exports.TwoBucket = TwoBucket;
