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
        this.starterBucket = starterBucket;
    }
    moves() {
        let moves = 0;
        let bucketOne = 0;
        let bucketTwo = 0;
        let starterBucketSize = this.starterBucket === Bucket.One ? this.bucketOneSize : this.bucketTwoSize;
        let otherBucketSize = this.starterBucket === Bucket.One ? this.bucketTwoSize : this.bucketOneSize;
        while (bucketOne !== this.goal && bucketTwo !== this.goal) {
            moves++;
            if (bucketOne === 0) {
                bucketOne = this.bucketOneSize;
            }
            else if (bucketTwo === this.bucketTwoSize) {
                bucketTwo = 0;
            }
            else {
                const pourAmount = Math.min(bucketOne, this.bucketTwoSize - bucketTwo);
                bucketTwo += pourAmount;
                bucketOne -= pourAmount;
            }
            if (bucketOne === this.goal || bucketTwo === this.goal)
                break;
            moves++;
            if (bucketTwo === 0) {
                bucketTwo = this.bucketTwoSize;
            }
            else if (bucketOne === this.bucketOneSize) {
                bucketOne = 0;
            }
            else {
                const pourAmount = Math.min(bucketTwo, this.bucketOneSize - bucketOne);
                bucketOne += pourAmount;
                bucketTwo -= pourAmount;
            }
        }
        return moves;
    }
}
exports.TwoBucket = TwoBucket;
