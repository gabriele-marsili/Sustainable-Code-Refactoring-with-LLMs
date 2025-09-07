type Buckets = { one: number; two: number }

type Bucket = keyof Buckets

export class TwoBucket {
  private readonly bucketOneSize: number
  private readonly bucketTwoSize: number
  private readonly goal: number
  private readonly starterBucket: Bucket
  private readonly largeBucket: Bucket
  private readonly smallBucket: Bucket
  private bucketOne: number
  private bucketTwo: number

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: Bucket) {
    this.bucketOneSize = bucketOne
    this.bucketTwoSize = bucketTwo
    this.goal = goal
    this.starterBucket = starterBucket
    this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one'
    this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one'
    this.bucketOne = 0
    this.bucketTwo = 0
  }

  moves(): number {
    if (this.starterBucket === this.largeBucket) {
      return this.largeBucketFirst()
    }

    return this.smallBucketFirst()
  }

  private smallBucketFirst(): number {
    let moves = 0
    let bucketOne = 0
    let bucketTwo = 0
    const largeBucketSize = this.largeBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
    const smallBucketSize = this.smallBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
    let largeBucket = this.largeBucket === 'one' ? bucketOne : bucketTwo;
    let smallBucket = this.smallBucket === 'one' ? bucketOne : bucketTwo;

    while (largeBucket !== this.goal && smallBucket !== this.goal) {
      while (largeBucket !== largeBucketSize) {
        smallBucket = smallBucketSize;
        moves++;
        if (smallBucket === this.goal || largeBucket === this.goal) return moves;

        const addedVolume = largeBucketSize - largeBucket;
        const pourAmount = Math.min(smallBucket, addedVolume);
        largeBucket += pourAmount;
        smallBucket -= pourAmount;
        moves++;
        if (smallBucket === this.goal || largeBucket === this.goal) return moves;
      }

      largeBucket = 0;
      moves++;
      if (smallBucket === this.goal || largeBucket === this.goal) return moves;

      const addedVolume = largeBucketSize - largeBucket;
      const pourAmount = Math.min(smallBucket, addedVolume);
      largeBucket += pourAmount;
      smallBucket -= pourAmount;
      moves++;
      if (smallBucket === this.goal || largeBucket === this.goal) return moves;

    }

    this.bucketOne = bucketOne;
    this.bucketTwo = bucketTwo;
    return moves
  }

  private largeBucketFirst(): number {
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
      if (smallBucket === this.goal || largeBucket === this.goal) return moves;

      while (largeBucket >= smallBucketSize) {
        const pourAmount = smallBucketSize - smallBucket;
        largeBucket -= pourAmount;
        smallBucket += pourAmount;
        moves++;
        if (smallBucket === this.goal || largeBucket === this.goal) return moves;

        smallBucket = 0;
        moves++;
        if (smallBucket === this.goal || largeBucket === this.goal) return moves;
      }

      const pourAmount = smallBucketSize - smallBucket;
      largeBucket -= pourAmount;
      smallBucket += pourAmount
      moves++;
      if (smallBucket === this.goal || largeBucket === this.goal) return moves;
    }

    this.bucketOne = bucketOne;
    this.bucketTwo = bucketTwo;
    return moves;
  }

  private pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    const source = sourceBucket === 'one' ? 'bucketOne' : 'bucketTwo';
    const target = targetBucket === 'one' ? 'bucketOne' : 'bucketTwo';
    const sourceSize = sourceBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
    const targetSize = targetBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;

    if (this[source] === 0) return

    let addedVolume = targetSize - this[target]

    if (addedVolume > this[source]) {
      addedVolume = this[source]
    }

    this[target] += addedVolume
    this[source] -= addedVolume
  }

  private fillBucket(bucket: Bucket): void {
    this[bucket === 'one' ? 'bucketOne' : 'bucketTwo'] = bucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;
  }

  private emptyBucket(bucket: Bucket): void {
    this[bucket === 'one' ? 'bucketOne' : 'bucketTwo'] = 0;
  }

  get goalBucket(): Bucket | null {
    if ((this.largeBucket === 'one' ? this.bucketOne : this.bucketTwo) === this.goal) return this.largeBucket
    if ((this.smallBucket === 'one' ? this.bucketOne : this.bucketTwo) === this.goal) return this.smallBucket

    return null
  }

  get otherBucket(): number {
    const goalBucket = this.goalBucket;
    return goalBucket === 'one' ? this.bucketTwo : this.bucketOne;
  }
}