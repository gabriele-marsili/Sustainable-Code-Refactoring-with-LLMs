export enum Bucket {
  One = 'one',
  Two = 'two'
}

export class TwoBucket {
  public goalBucket: Bucket
  public goal: number
  public starterBucketSize: number
  public otherBucketSize: number
  public starterBucket: number
  public otherBucket: number

  constructor(
    bucketOneSize: number,
    bucketTwoSize: number,
    goal: number,
    starterBucket: Bucket
  ) {
    this.goalBucket = starterBucket
    this.goal = goal
    
    if (starterBucket === Bucket.One) {
      this.starterBucketSize = bucketOneSize
      this.otherBucketSize = bucketTwoSize
    } else {
      this.starterBucketSize = bucketTwoSize
      this.otherBucketSize = bucketOneSize
    }
    
    this.starterBucket = 0
    this.otherBucket = 0
  }

  public moves(): number {
    if (this.goal === 0) return 0
    if (this.goal === this.starterBucketSize) return 1
    
    let count = 0
    let starter = 0
    let other = 0
    const starterSize = this.starterBucketSize
    const otherSize = this.otherBucketSize
    const target = this.goal

    while (starter !== target) {
      if (starter === 0) {
        starter = starterSize
      } else if (other === otherSize) {
        other = 0
      } else {
        const transfer = Math.min(starter, otherSize - other)
        starter -= transfer
        other += transfer
      }
      count++
    }

    return count
  }
}