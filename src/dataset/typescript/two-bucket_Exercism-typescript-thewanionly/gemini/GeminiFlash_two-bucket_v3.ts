type Buckets = { one: number; two: number };

type Bucket = keyof Buckets;

export class TwoBucket {
  private readonly bucketOneSize: number;
  private readonly bucketTwoSize: number;
  private bucketOne: number;
  private bucketTwo: number;
  private readonly goal: number;
  private readonly starterBucket: Bucket;
  private readonly largeBucket: Bucket;
  private readonly smallBucket: Bucket;

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: Bucket) {
    this.bucketOneSize = bucketOne;
    this.bucketTwoSize = bucketTwo;
    this.bucketOne = 0;
    this.bucketTwo = 0;
    this.goal = goal;
    this.starterBucket = starterBucket;
    this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one';
    this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one';
  }

  moves(): number {
    if (this.starterBucket === this.largeBucket) {
      return this.largeBucketFirst();
    }

    return this.smallBucketFirst();
  }

  private smallBucketFirst(): number {
    let moves = 0;
    const largeBucketSize = this[this.largeBucket === 'one' ? 'bucketOneSize' : 'bucketTwoSize'];
    const smallBucketSize = this[this.smallBucket === 'one' ? 'bucketOneSize' : 'bucketTwoSize'];

    while (this[this.largeBucket] !== this.goal && this[this.smallBucket] !== this.goal) {
      while (this[this.largeBucket] !== largeBucketSize) {
        this.fillBucket(this.smallBucket);
        moves++;
        if (this.goalBucket) return moves;

        this.pourIntoBucket(this.smallBucket, this.largeBucket);
        moves++;
        if (this.goalBucket) return moves;
      }

      this.emptyBucket(this.largeBucket);
      moves++;
      if (this.goalBucket) return moves;

      this.pourIntoBucket(this.smallBucket, this.largeBucket);
      moves++;
      if (this.goalBucket) return moves;
    }

    return moves;
  }

  private largeBucketFirst(): number {
    let moves = 0;
    const largeBucketSize = this[this.largeBucket === 'one' ? 'bucketOneSize' : 'bucketTwoSize'];
    const smallBucketSize = this[this.smallBucket === 'one' ? 'bucketOneSize' : 'bucketTwoSize'];

    while (this[this.largeBucket] !== this.goal && this[this.smallBucket] !== this.goal) {
      this.fillBucket(this.largeBucket);
      moves++;
      if (this.goalBucket) return moves;

      while (this[this.largeBucket] >= smallBucketSize) {
        this.pourIntoBucket(this.largeBucket, this.smallBucket);
        moves++;
        if (this.goalBucket) return moves;

        this.emptyBucket(this.smallBucket);
        moves++;
        if (this.goalBucket) return moves;
      }

      this.pourIntoBucket(this.largeBucket, this.smallBucket);
      moves++;
      if (this.goalBucket) return moves;
    }

    return moves;
  }

  private pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    const source = sourceBucket === 'one' ? 'bucketOne' : 'bucketTwo';
    const target = targetBucket === 'one' ? 'bucketOne' : 'bucketTwo';
    const targetSize = targetBucket === 'one' ? this.bucketOneSize : this.bucketTwoSize;

    if (this[source] === 0) return;

    let addedVolume = targetSize - this[target];

    if (addedVolume > this[source]) {
      addedVolume = this[source];
    }

    this[target] += addedVolume;
    this[source] -= addedVolume;
  }

  private fillBucket(bucket: Bucket): void {
    if (bucket === 'one') {
      this.bucketOne = this.bucketOneSize;
    } else {
      this.bucketTwo = this.bucketTwoSize;
    }
  }

  private emptyBucket(bucket: Bucket): void {
    if (bucket === 'one') {
      this.bucketOne = 0;
    } else {
      this.bucketTwo = 0;
    }
  }

  private get goalBucket(): Bucket | null {
    if (this[this.largeBucket] === this.goal) return this.largeBucket;
    if (this[this.smallBucket] === this.goal) return this.smallBucket;

    return null;
  }

  get otherBucket(): number {
    const goalBucket = this.goalBucket;
    return goalBucket === 'one' ? this.bucketTwo : this.bucketOne;
  }

  private get buckets(): Buckets {
    return { one: this.bucketOne, two: this.bucketTwo };
  }

  private get bucketsSize(): Buckets {
    return { one: this.bucketOneSize, two: this.bucketTwoSize };
  }
}