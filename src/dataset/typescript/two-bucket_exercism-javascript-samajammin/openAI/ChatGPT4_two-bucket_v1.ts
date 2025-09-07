export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  private readonly goal: number;
  private readonly starterBucketSize: number;
  private readonly otherBucketSize: number;
  private starterBucket: number = 0;
  private otherBucket: number = 0;

  constructor(
    bucketOneSize: number,
    bucketTwoSize: number,
    goal: number,
    starterBucket: Bucket
  ) {
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
    let count = 0;

    while (this.starterBucket !== this.goal) {
      if (this.starterBucket === 0) {
        this.starterBucket = this.starterBucketSize;
      } else if (this.otherBucket === this.otherBucketSize) {
        this.otherBucket = 0;
      } else {
        const transferAmount = Math.min(this.starterBucket, this.otherBucketSize - this.otherBucket);
        this.otherBucket += transferAmount;
        this.starterBucket -= transferAmount;
      }
      count++;
    }

    return count;
  }
}