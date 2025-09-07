type Buckets = { one: number; two: number }

type Bucket = keyof Buckets

export class TwoBucket {
  private readonly bucketOneSize: number
  private readonly bucketTwoSize: number
  private readonly goal: number
  private readonly starterBucket: Bucket
  private readonly isBucketOneLarger: boolean

  private bucketOne: number
  private bucketTwo: number

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: Bucket) {
    this.bucketOneSize = bucketOne
    this.bucketTwoSize = bucketTwo
    this.goal = goal
    this.starterBucket = starterBucket
    this.isBucketOneLarger = bucketOne > bucketTwo

    this.bucketOne = 0
    this.bucketTwo = 0
  }

  moves(): number {
    if (this.starterBucket === (this.isBucketOneLarger ? 'one' : 'two')) {
      return this.solve(this.isBucketOneLarger ? 'one' : 'two')
    } else {
      return this.solve(this.isBucketOneLarger ? 'two' : 'one')
    }
  }

  private solve(firstBucket: Bucket): number {
    let moves = 0
    let otherBucket: Bucket = firstBucket === 'one' ? 'two' : 'one';

    while (this.bucketOne !== this.goal && this.bucketTwo !== this.goal) {
      if (firstBucket === 'one') {
        this.bucketOne = this.bucketOneSize;
        moves++;
        if (this.isGoalReached()) return moves;

        while (this.bucketOne > 0 && this.bucketTwo < this.bucketTwoSize) {
          const pourAmount = Math.min(this.bucketOne, this.bucketTwoSize - this.bucketTwo);
          this.bucketOne -= pourAmount;
          this.bucketTwo += pourAmount;
          moves++;
          if (this.isGoalReached()) return moves;
        }

        if (this.bucketTwo === this.bucketTwoSize) {
          this.bucketTwo = 0;
          moves++;
          if (this.isGoalReached()) return moves;
        }
      } else {
        this.bucketTwo = this.bucketTwoSize;
        moves++;
        if (this.isGoalReached()) return moves;

        while (this.bucketTwo > 0 && this.bucketOne < this.bucketOneSize) {
          const pourAmount = Math.min(this.bucketTwo, this.bucketOneSize - this.bucketOne);
          this.bucketTwo -= pourAmount;
          this.bucketOne += pourAmount;
          moves++;
          if (this.isGoalReached()) return moves;
        }

        if (this.bucketOne === this.bucketOneSize) {
          this.bucketOne = 0;
          moves++;
          if (this.isGoalReached()) return moves;
        }
      }
    }

    return moves;
  }

  private isGoalReached(): boolean {
    return this.bucketOne === this.goal || this.bucketTwo === this.goal;
  }

  get goalBucket(): Bucket {
    if (this.bucketOne === this.goal) return 'one';
    return 'two';
  }

  get otherBucket(): number {
    return this.bucketOne === this.goal ? this.bucketTwo : this.bucketOne;
  }
}