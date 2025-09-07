export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  private readonly goalBucket: Bucket;
  private readonly goal: number;
  private readonly starterBucketSize: number;
  private readonly otherBucketSize: number;

  constructor(
    bucketOneSize: number,
    bucketTwoSize: number,
    goal: number,
    starterBucket: Bucket
  ) {
    this.goalBucket = starterBucket;
    this.goal = goal;
    if (starterBucket === Bucket.One) {
      this.starterBucketSize = bucketOneSize;
      this.otherBucketSize = bucketTwoSize;
    } else {
      this.starterBucketSize = bucketTwoSize;
      this.otherBucketSize = bucketOneSize;
    }
  }

  public moves(): number {
    let starterBucket = 0;
    let otherBucket = 0;
    let count = 0;

    while (starterBucket !== this.goal && otherBucket !== this.goal) {
      if (starterBucket === 0) {
        starterBucket = this.starterBucketSize; // Fill starter bucket
      } else if (otherBucket === this.otherBucketSize) {
        otherBucket = 0; // Empty other bucket
      } else {
        const transferAmount = Math.min(starterBucket, this.otherBucketSize - otherBucket);
        otherBucket += transferAmount;
        starterBucket -= transferAmount;
      }
      count++;
    }

    return count;
  }
}