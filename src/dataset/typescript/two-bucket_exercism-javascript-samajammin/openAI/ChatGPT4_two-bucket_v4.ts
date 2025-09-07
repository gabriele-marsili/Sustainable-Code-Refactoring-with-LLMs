export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  public goalBucket: Bucket;
  public goal: number;
  private starterBucketSize: number;
  private otherBucketSize: number;

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

    while (starterBucket !== this.goal) {
      if (starterBucket === 0) {
        starterBucket = this.starterBucketSize;
      } else if (otherBucket === this.otherBucketSize) {
        otherBucket = 0;
      } else {
        const transfer = Math.min(starterBucket, this.otherBucketSize - otherBucket);
        otherBucket += transfer;
        starterBucket -= transfer;
      }
      count++;
    }

    return count;
  }
}