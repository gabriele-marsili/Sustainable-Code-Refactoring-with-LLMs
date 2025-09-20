type Buckets = { one: number; two: number };

type Bucket = keyof Buckets;

export class TwoBucket {
  private buckets: Buckets = { one: 0, two: 0 };
  private readonly bucketsSize: Buckets;
  private readonly goal: number;
  private readonly starterBucket: Bucket;
  private readonly largeBucket: Bucket;
  private readonly smallBucket: Bucket;

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: Bucket) {
    this.bucketsSize = { one: bucketOne, two: bucketTwo };
    this.goal = goal;
    this.starterBucket = starterBucket;
    this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one';
    this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one';
  }

  moves(): number {
    return this.starterBucket === this.largeBucket
      ? this.largeBucketFirst()
      : this.smallBucketFirst();
  }

  private smallBucketFirst(): number {
    let moves = 0;

    while (!this.isGoalReached()) {
      if (this.buckets[this.largeBucket] === this.bucketsSize[this.largeBucket]) {
        this.emptyBucket(this.largeBucket);
      } else {
        if (this.buckets[this.smallBucket] === 0) {
          this.fillBucket(this.smallBucket);
        }
        this.pourIntoBucket(this.smallBucket, this.largeBucket);
      }
      moves++;
    }

    return moves;
  }

  private largeBucketFirst(): number {
    let moves = 0;

    while (!this.isGoalReached()) {
      if (this.buckets[this.largeBucket] === 0) {
        this.fillBucket(this.largeBucket);
      } else if (this.buckets[this.smallBucket] === this.bucketsSize[this.smallBucket]) {
        this.emptyBucket(this.smallBucket);
      } else {
        this.pourIntoBucket(this.largeBucket, this.smallBucket);
      }
      moves++;
    }

    return moves;
  }

  private pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    const addedVolume = Math.min(
      this.bucketsSize[targetBucket] - this.buckets[targetBucket],
      this.buckets[sourceBucket]
    );
    this.buckets[targetBucket] += addedVolume;
    this.buckets[sourceBucket] -= addedVolume;
  }

  private fillBucket(bucket: Bucket): void {
    this.buckets[bucket] = this.bucketsSize[bucket];
  }

  private emptyBucket(bucket: Bucket): void {
    this.buckets[bucket] = 0;
  }

  private isGoalReached(): boolean {
    return (
      this.buckets[this.largeBucket] === this.goal ||
      this.buckets[this.smallBucket] === this.goal
    );
  }

  get goalBucket(): Bucket | null {
    if (this.buckets[this.largeBucket] === this.goal) return this.largeBucket;
    if (this.buckets[this.smallBucket] === this.goal) return this.smallBucket;
    return null;
  }

  get otherBucket(): number {
    return this.buckets[this.goalBucket === 'one' ? 'two' : 'one'];
  }
}