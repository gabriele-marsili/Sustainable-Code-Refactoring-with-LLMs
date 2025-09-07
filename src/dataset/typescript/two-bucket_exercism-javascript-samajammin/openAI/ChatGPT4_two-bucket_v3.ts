export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  public goalBucket: Bucket;
  public goal: number;
  public starterBucketSize: number;
  public otherBucketSize: number;
  public starterBucket: number = 0;
  public otherBucket: number = 0;

  constructor(
    bucketOneSize: number,
    bucketTwoSize: number,
    goal: number,
    starterBucket: Bucket
  ) {
    this.goalBucket = starterBucket;
    if (starterBucket === Bucket.One) {
      this.starterBucketSize = bucketOneSize;
      this.otherBucketSize = bucketTwoSize;
    } else {
      this.starterBucketSize = bucketTwoSize;
      this.otherBucketSize = bucketOneSize;
    }
    this.goal = goal;
  }

  public moves(): number {
    let count = 0;

    while (this.starterBucket !== this.goal) {
      if (this.starterBucket === 0) {
        this.starterBucket = this.starterBucketSize;
      } else if (this.otherBucket === this.otherBucketSize) {
        this.otherBucket = 0;
      } else {
        const transferAmount = Math.min(
          this.starterBucket,
          this.otherBucketSize - this.otherBucket
        );
        this.otherBucket += transferAmount;
        this.starterBucket -= transferAmount;
      }
      count++;
    }

    return count;
  }
}