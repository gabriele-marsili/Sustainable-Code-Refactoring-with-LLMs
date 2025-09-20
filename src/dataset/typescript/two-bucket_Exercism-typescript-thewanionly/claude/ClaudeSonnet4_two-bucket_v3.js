"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = void 0;
class TwoBucket {
    constructor(bucketOne, bucketTwo, goal, starterBucket) {
        this.buckets = {
            one: 0,
            two: 0
        };
        this.bucketsSize = {
            one: bucketOne,
            two: bucketTwo
        };
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
        while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
            while (this.buckets[this.largeBucket] !== this.bucketsSize[this.largeBucket]) {
                this.fillBucket(this.smallBucket);
                moves++;
                if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal)
                    return moves;
                this.pourIntoBucket(this.smallBucket, this.largeBucket);
                moves++;
                if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal)
                    return moves;
            }
            this.emptyBucket(this.largeBucket);
            moves++;
            if (this.buckets[this.smallBucket] === this.goal)
                return moves;
            this.pourIntoBucket(this.smallBucket, this.largeBucket);
            moves++;
            if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal)
                return moves;
        }
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
            this.fillBucket(this.largeBucket);
            moves++;
            if (this.buckets[this.largeBucket] === this.goal)
                return moves;
            while (this.buckets[this.largeBucket] >= this.bucketsSize[this.smallBucket]) {
                this.pourIntoBucket(this.largeBucket, this.smallBucket);
                moves++;
                if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal)
                    return moves;
                this.emptyBucket(this.smallBucket);
                moves++;
                if (this.buckets[this.largeBucket] === this.goal)
                    return moves;
            }
            this.pourIntoBucket(this.largeBucket, this.smallBucket);
            moves++;
            if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal)
                return moves;
        }
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        const sourceVolume = this.buckets[sourceBucket];
        if (sourceVolume === 0)
            return;
        const availableSpace = this.bucketsSize[targetBucket] - this.buckets[targetBucket];
        const transferVolume = Math.min(availableSpace, sourceVolume);
        this.buckets[targetBucket] += transferVolume;
        this.buckets[sourceBucket] -= transferVolume;
    }
    fillBucket(bucket) {
        this.buckets[bucket] = this.bucketsSize[bucket];
    }
    emptyBucket(bucket) {
        this.buckets[bucket] = 0;
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
