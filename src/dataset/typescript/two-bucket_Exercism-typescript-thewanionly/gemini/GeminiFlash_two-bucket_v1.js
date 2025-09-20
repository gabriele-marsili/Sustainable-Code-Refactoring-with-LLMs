"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = void 0;
class TwoBucket {
    constructor(bucketOne, bucketTwo, goal, starterBucket) {
        this.bucketOneSize = bucketOne;
        this.bucketTwoSize = bucketTwo;
        this.goal = goal;
        this.starterBucket = starterBucket;
        this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one';
        this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one';
        this.bucketOne = 0;
        this.bucketTwo = 0;
    }
    moves() {
        if (this.starterBucket === this.largeBucket) {
            return this.largeBucketFirst();
        }
        return this.smallBucketFirst();
    }
    smallBucketFirst() {
        let moves = 0;
        let bucketOne = 0;
        let bucketTwo = 0;
        const largeBucketSize = this.largeBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        const smallBucketSize = this.smallBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        let largeBucket = this.largeBucket === 'one' ? bucketOne : bucketTwo;
        let smallBucket = this.smallBucket === 'one' ? bucketOne : bucketTwo;
        while (largeBucket !== this.goal && smallBucket !== this.goal) {
            while (largeBucket !== largeBucketSize) {
                smallBucket = smallBucketSize;
                moves++;
                if (smallBucket === this.goal || largeBucket === this.goal)
                    return moves;
                const addedVolume = largeBucketSize - largeBucket;
                const pourAmount = Math.min(smallBucket, addedVolume);
                largeBucket += pourAmount;
                smallBucket -= pourAmount;
                moves++;
                if (smallBucket === this.goal || largeBucket === this.goal)
                    return moves;
            }
            largeBucket = 0;
            moves++;
            if (smallBucket === this.goal || largeBucket === this.goal)
                return moves;
            const addedVolume = largeBucketSize - largeBucket;
            const pourAmount = Math.min(smallBucket, addedVolume);
            largeBucket += pourAmount;
            smallBucket -= pourAmount;
            moves++;
            if (smallBucket === this.goal || largeBucket === this.goal)
                return moves;
        }
        this.bucketOne = bucketOne;
        this.bucketTwo = bucketTwo;
        return moves;
    }
    largeBucketFirst() {
        let moves = 0;
        let bucketOne = 0;
        let bucketTwo = 0;
        const largeBucketSize = this.largeBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        const smallBucketSize = this.smallBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        let largeBucket = this.largeBucket === 'one' ? bucketOne : bucketTwo;
        let smallBucket = this.smallBucket === 'one' ? bucketOne : bucketTwo;
        while (largeBucket !== this.goal && smallBucket !== this.goal) {
            largeBucket = largeBucketSize;
            moves++;
            if (smallBucket === this.goal || largeBucket === this.goal)
                return moves;
            while (largeBucket >= smallBucketSize) {
                const pourAmount = smallBucketSize - smallBucket;
                largeBucket -= pourAmount;
                smallBucket += pourAmount;
                moves++;
                if (smallBucket === this.goal || largeBucket === this.goal)
                    return moves;
                smallBucket = 0;
                moves++;
                if (smallBucket === this.goal || largeBucket === this.goal)
                    return moves;
            }
            const pourAmount = smallBucketSize - smallBucket;
            largeBucket -= pourAmount;
            smallBucket += pourAmount;
            moves++;
            if (smallBucket === this.goal || largeBucket === this.goal)
                return moves;
        }
        this.bucketOne = bucketOne;
        this.bucketTwo = bucketTwo;
        return moves;
    }
    pourIntoBucket(sourceBucket, targetBucket) {
        const source = sourceBucket === 'one' ? 'bucketOne' : 'bucketTwo';
        const target = targetBucket === 'one' ? 'bucketOne' : 'bucketTwo';
        const sourceSize = sourceBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        const targetSize = targetBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
        if (this[source] === 0)
            return;
        let addedVolume = targetSize - this[target];
        if (addedVolume > this[source]) {
            addedVolume = this[source];
        }
        this[target] += addedVolume;
        this[source] -= addedVolume;
    }
    fillBucket(bucket) {
        this[bucket === 'one' ? 'bucketOne' : 'bucketTwo'] = bucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
    }
    emptyBucket(bucket) {
        this[bucket === 'one' ? 'bucketOne' : 'bucketTwo'] = 0;
    }
    get goalBucket() {
        if ((this.largeBucket === 'one' ? this.bucketOne : this.bucketTwo) === this.goal)
            return this.largeBucket;
        if ((this.smallBucket === 'one' ? this.bucketOne : this.bucketTwo) === this.goal)
            return this.smallBucket;
        return null;
    }
    get otherBucket() {
        const goalBucket = this.goalBucket;
        return goalBucket === 'one' ? this.bucketTwo : this.bucketOne;
    }
}
exports.TwoBucket = TwoBucket;
