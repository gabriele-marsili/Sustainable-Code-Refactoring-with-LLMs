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
            if (this.buckets[this.largeBucket] !== this.bucketsSize[this.largeBucket]) {
                this.fillBucket(this.smallBucket);
                moves++;
                if (this.isGoalReached())
                    break;
                this.pourIntoBucket(this.smallBucket, this.largeBucket);
                moves++;
                if (this.isGoalReached())
                    break;
            }
            else {
                this.emptyBucket(this.largeBucket);
                moves++;
                if (this.isGoalReached())
                    break;
                this.pourIntoBucket(this.smallBucket, this.largeBucket);
                moves++;
            }
        }
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        while (!this.isGoalReached()) {
            this.fillBucket(this.largeBucket);
            moves++;
            if (this.isGoalReached())
                break;
            while (this.buckets[this.largeBucket] >= this.bucketsSize[this.smallBucket]) {
                this.pourIntoBucket(this.largeBucket, this.smallBucket);
                moves++;
                if (this.isGoalReached())
                    break;
                this.emptyBucket(this.smallBucket);
                moves++;
                if (this.isGoalReached())
                    break;
            }
            this.pourIntoBucket(this.largeBucket, this.smallBucket);
            moves++;
        }
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        if (this.buckets[sourceBucket] === 0)
            return;
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
        return this.buckets[this.largeBucket] === this.goal
            ? this.largeBucket
            : this.buckets[this.smallBucket] === this.goal
                ? this.smallBucket
                : null;
    }
    get otherBucket() {
        return this.buckets[this.goalBucket === 'one' ? 'two' : 'one'];
    }
}
exports.TwoBucket = TwoBucket;
