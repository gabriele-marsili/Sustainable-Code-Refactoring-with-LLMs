"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = void 0;
class TwoBucket {
    constructor(bucketOne, bucketTwo, goal, starterBucket) {
        this.buckets = { one: 0, two: 0 };
        this.bucketsSize = { one: bucketOne, two: bucketTwo };
        this.goal = goal;
        this.starterBucket = starterBucket;
        this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one';
        this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one';
    }
    moves() {
        return this.starterBucket === this.largeBucket
            ? this.largeBucketFirst()
            : this.smallBucketFirst();
    }
    smallBucketFirst() {
        let moves = 0;
        while (!this.isGoalReached()) {
            if (this.buckets[this.largeBucket] === this.bucketsSize[this.largeBucket]) {
                this.emptyBucket(this.largeBucket);
            }
            else {
                if (this.buckets[this.smallBucket] === 0) {
                    this.fillBucket(this.smallBucket);
                }
                this.pourIntoBucket(this.smallBucket, this.largeBucket);
            }
            moves++;
        }
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        while (!this.isGoalReached()) {
            if (this.buckets[this.largeBucket] === 0) {
                this.fillBucket(this.largeBucket);
            }
            else if (this.buckets[this.smallBucket] === this.bucketsSize[this.smallBucket]) {
                this.emptyBucket(this.smallBucket);
            }
            else {
                this.pourIntoBucket(this.largeBucket, this.smallBucket);
            }
            moves++;
        }
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        const addedVolume = Math.min(this.bucketsSize[targetBucket] - this.buckets[targetBucket], this.buckets[sourceBucket]);
        this.buckets[targetBucket] += addedVolume;
        this.buckets[sourceBucket] -= addedVolume;
    }
    fillBucket(bucket) {
        this.buckets[bucket] = this.bucketsSize[bucket];
    }
    emptyBucket(bucket) {
        this.buckets[bucket] = 0;
    }
    isGoalReached() {
        return (this.buckets[this.largeBucket] === this.goal ||
            this.buckets[this.smallBucket] === this.goal);
    }
    get goalBucket() {
        if (this.buckets[this.largeBucket] === this.goal)
            return this.largeBucket;
        if (this.buckets[this.smallBucket] === this.goal)
            return this.smallBucket;
        return null;
    }
    get otherBucket() {
        return this.buckets[this.goalBucket === 'one' ? 'two' : 'one'];
    }
}
exports.TwoBucket = TwoBucket;
