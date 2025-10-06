export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  private readonly bucketOneSize: number;
  private readonly bucketTwoSize: number;
  public readonly goal: number;
  public readonly goalBucket: Bucket;
  private starterBucket: number;
  private otherBucket: number;

  constructor(
    bucketOneSize: number,
    bucketTwoSize: number,
    goal: number,
    starterBucket: Bucket
  ) {
    this.bucketOneSize = bucketOneSize;
    this.bucketTwoSize = bucketTwoSize;
    this.goal = goal;
    this.goalBucket = starterBucket;
    this.starterBucket = 0;
    this.otherBucket = 0;
  }

  public moves(): number {
    let count = 0;
    let starterBucketSize = this.goalBucket === Bucket.One ? this.bucketOneSize : this.bucketTwoSize;
    let otherBucketSize = this.goalBucket === Bucket.One ? this.bucketTwoSize : this.bucketOneSize;
    let starterBucket = 0;
    let otherBucket = 0;

    while (starterBucket !== this.goal) {
      count++;

      if (starterBucket === 0) {
        starterBucket = starterBucketSize;
      } else if (otherBucket === otherBucketSize) {
        otherBucket = 0;
      } else {
        const pourAmount = Math.min(starterBucket, otherBucketSize - otherBucket);
        otherBucket += pourAmount;
        starterBucket -= pourAmount;
      }
    }

    return count;
  }
}