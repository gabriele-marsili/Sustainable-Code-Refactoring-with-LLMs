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
        if (this.starterBucket === this.largeBucket) {
            return this.largeBucketFirst();
        }
        return this.smallBucketFirst();
    }
    smallBucketFirst() {
        let moves = 0;
        while (this.buckets[this.largeBucket] !== this.goal &&
            this.buckets[this.smallBucket] !== this.goal) {
            //1, While largeBucket is not yet full
            while (this.buckets[this.largeBucket] !== this.bucketsSize[this.largeBucket]) {
                //1A. Fill smallBucket
                this.fillBucket(this.smallBucket);
                moves++;
                if (this.goalBucket)
                    return moves; //check if the goal has been reached
                //1B. Pour smallBucket to largeBucket
                this.pourIntoBucket(this.smallBucket, this.largeBucket);
                moves++;
                if (this.goalBucket)
                    return moves; //check if the goal has been reached
            }
            //2. Empty largeBucket
            this.emptyBucket(this.largeBucket);
            moves++;
            if (this.goalBucket)
                return moves; //check if the goal has been reached
            //3. Pour smallBucket to largeBucket
            this.pourIntoBucket(this.smallBucket, this.largeBucket);
            moves++;
            if (this.goalBucket)
                return moves; //check if the goal has been reached
        }
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        while (this.buckets[this.largeBucket] !== this.goal &&
            this.buckets[this.smallBucket] !== this.goal) {
            //1. Fill largebucket
            this.fillBucket(this.largeBucket);
            moves++;
            if (this.goalBucket)
                return moves; //check if the goal has been reached
            //2. While largeBucket's volume is greater than smallBucket's size, pour largeBucket to smallBucket then empty smallBucket
            while (this.buckets[this.largeBucket] >= this.bucketsSize[this.smallBucket]) {
                //2a. Pour largeBucket to smallBucket
                this.pourIntoBucket(this.largeBucket, this.smallBucket);
                moves++;
                if (this.goalBucket)
                    return moves; //check if the goal has been reached
                //2b. Empty smallBucket
                this.emptyBucket(this.smallBucket);
                moves++;
                if (this.goalBucket)
                    return moves; //check if the goal has been reached
            }
            //3. Pour largeBucket to smallBucket
            this.pourIntoBucket(this.largeBucket, this.smallBucket);
            moves++;
            if (this.goalBucket)
                return moves; //check if the goal has been reached
        }
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        if (this.buckets[sourceBucket] === 0)
            return;
        // max volumne allowed to add
        let addedVolume = this.bucketsSize[targetBucket] - this.buckets[targetBucket];
        if (addedVolume > this.buckets[sourceBucket]) {
            addedVolume = this.buckets[sourceBucket];
        }
        // targetBucket's new volume
        this.buckets[targetBucket] += addedVolume;
        // sourceBucket's new volume
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
