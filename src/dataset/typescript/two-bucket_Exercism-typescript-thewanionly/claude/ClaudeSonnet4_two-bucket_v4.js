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
        const { largeBucket, smallBucket, bucketsSize, buckets, goal } = this;
        while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
            while (buckets[largeBucket] !== bucketsSize[largeBucket]) {
                buckets[smallBucket] = bucketsSize[smallBucket];
                moves++;
                if (buckets[smallBucket] === goal || buckets[largeBucket] === goal)
                    return moves;
                const transfer = Math.min(buckets[smallBucket], bucketsSize[largeBucket] - buckets[largeBucket]);
                buckets[smallBucket] -= transfer;
                buckets[largeBucket] += transfer;
                moves++;
                if (buckets[smallBucket] === goal || buckets[largeBucket] === goal)
                    return moves;
            }
            buckets[largeBucket] = 0;
            moves++;
            if (buckets[smallBucket] === goal)
                return moves;
            const transfer = Math.min(buckets[smallBucket], bucketsSize[largeBucket]);
            buckets[smallBucket] -= transfer;
            buckets[largeBucket] += transfer;
            moves++;
            if (buckets[smallBucket] === goal || buckets[largeBucket] === goal)
                return moves;
        }
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        const { largeBucket, smallBucket, bucketsSize, buckets, goal } = this;
        while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
            buckets[largeBucket] = bucketsSize[largeBucket];
            moves++;
            if (buckets[largeBucket] === goal)
                return moves;
            while (buckets[largeBucket] >= bucketsSize[smallBucket]) {
                const transfer = Math.min(buckets[largeBucket], bucketsSize[smallBucket] - buckets[smallBucket]);
                buckets[largeBucket] -= transfer;
                buckets[smallBucket] += transfer;
                moves++;
                if (buckets[smallBucket] === goal || buckets[largeBucket] === goal)
                    return moves;
                buckets[smallBucket] = 0;
                moves++;
                if (buckets[largeBucket] === goal)
                    return moves;
            }
            const transfer = Math.min(buckets[largeBucket], bucketsSize[smallBucket] - buckets[smallBucket]);
            buckets[largeBucket] -= transfer;
            buckets[smallBucket] += transfer;
            moves++;
            if (buckets[smallBucket] === goal || buckets[largeBucket] === goal)
                return moves;
        }
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        if (this.buckets[sourceBucket] === 0)
            return;
        const addedVolume = Math.min(this.buckets[sourceBucket], this.bucketsSize[targetBucket] - this.buckets[targetBucket]);
        this.buckets[targetBucket] += addedVolume;
        this.buckets[sourceBucket] -= addedVolume;
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
