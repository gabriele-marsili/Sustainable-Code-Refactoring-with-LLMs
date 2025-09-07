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
      return this.solve(this.largeBucket, this.smallBucket, this.bucketSizes[this.largeBucket], this.bucketSizes[this.smallBucket]);
    } else {
      return this.solve(this.smallBucket, this.largeBucket, this.bucketSizes[this.smallBucket], this.bucketSizes[this.largeBucket]);
    }
  }

  private solve(firstBucketName: Bucket, secondBucketName: Bucket, firstBucketSize: number, secondBucketSize: number): number {
    let moves = 0;
    let firstBucket = 0;
    let secondBucket = 0;

    while (firstBucket !== this.goal && secondBucket !== this.goal) {
      if (firstBucket === 0) {
        firstBucket = firstBucketSize;
        moves++;
      } else if (secondBucket === secondBucketSize) {
        secondBucket = 0;
        moves++;
      } else {
        const pourAmount = Math.min(firstBucket, secondBucketSize - secondBucket);
        firstBucket -= pourAmount;
        secondBucket += pourAmount;
        moves++;
      }
    }

    this.bucketOne = firstBucketName === 'one' ? firstBucket : secondBucket;
    this.bucketTwo = firstBucketName === 'two' ? firstBucket : secondBucket;

    return moves;
  }

  private get bucketSizes(): { one: number; two: number } {
    return { one: this.bucketOneSize, two: this.bucketTwoSize };
  }

  get goalBucket(): Bucket {
    if (this.bucketOne === this.goal) return 'one';
    return 'two';
  }

  get otherBucket(): number {
    return this.goalBucket === 'one' ? this.bucketTwo : this.bucketOne;
  }
}