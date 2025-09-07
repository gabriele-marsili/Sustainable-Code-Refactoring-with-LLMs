type Buckets = { one: number; two: number }

type Bucket = keyof Buckets

export class TwoBucket {
  buckets: Buckets
  bucketsSize: Buckets
  goal: number
  starterBucket: Bucket
  largeBucket: Bucket
  smallBucket: Bucket

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: Bucket) {
    this.buckets = {
      one: 0,
      two: 0
    }
    this.bucketsSize = {
      one: bucketOne,
      two: bucketTwo
    }
    this.goal = goal
    this.starterBucket = starterBucket
    this.largeBucket = bucketTwo > bucketOne ? 'two' : 'one'
    this.smallBucket = bucketTwo < bucketOne ? 'two' : 'one'
  }

  moves(): number {
    return this.starterBucket === this.largeBucket ? this.largeBucketFirst() : this.smallBucketFirst()
  }

  smallBucketFirst(): number {
    let moves = 0
    const largeBucketSize = this.bucketsSize[this.largeBucket]
    const smallBucketSize = this.bucketsSize[this.smallBucket]

    while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
      while (this.buckets[this.largeBucket] !== largeBucketSize) {
        this.buckets[this.smallBucket] = smallBucketSize
        moves++
        if (this.buckets[this.smallBucket] === this.goal) return moves

        const pourAmount = Math.min(this.buckets[this.smallBucket], largeBucketSize - this.buckets[this.largeBucket])
        this.buckets[this.largeBucket] += pourAmount
        this.buckets[this.smallBucket] -= pourAmount
        moves++
        if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves
      }

      this.buckets[this.largeBucket] = 0
      moves++
      if (this.buckets[this.largeBucket] === this.goal) return moves

      const pourAmount = Math.min(this.buckets[this.smallBucket], largeBucketSize)
      this.buckets[this.largeBucket] += pourAmount
      this.buckets[this.smallBucket] -= pourAmount
      moves++
      if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves
    }

    return moves
  }

  largeBucketFirst(): number {
    let moves = 0
    const largeBucketSize = this.bucketsSize[this.largeBucket]
    const smallBucketSize = this.bucketsSize[this.smallBucket]

    while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
      this.buckets[this.largeBucket] = largeBucketSize
      moves++
      if (this.buckets[this.largeBucket] === this.goal) return moves

      while (this.buckets[this.largeBucket] >= smallBucketSize) {
        const pourAmount = Math.min(this.buckets[this.largeBucket], smallBucketSize - this.buckets[this.smallBucket])
        this.buckets[this.smallBucket] += pourAmount
        this.buckets[this.largeBucket] -= pourAmount
        moves++
        if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves

        this.buckets[this.smallBucket] = 0
        moves++
        if (this.buckets[this.smallBucket] === this.goal) return moves
      }

      const pourAmount = Math.min(this.buckets[this.largeBucket], smallBucketSize - this.buckets[this.smallBucket])
      this.buckets[this.smallBucket] += pourAmount
      this.buckets[this.largeBucket] -= pourAmount
      moves++
      if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves
    }

    return moves
  }

  pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    if (this.buckets[sourceBucket] === 0) return

    const addedVolume = Math.min(this.buckets[sourceBucket], this.bucketsSize[targetBucket] - this.buckets[targetBucket])
    this.buckets[targetBucket] += addedVolume
    this.buckets[sourceBucket] -= addedVolume
  }

  fillBucket(bucket: Bucket): void {
    this.buckets[bucket] = this.bucketsSize[bucket]
  }

  emptyBucket(bucket: Bucket): void {
    this.buckets[bucket] = 0
  }

  get goalBucket(): Bucket | null {
    if (this.buckets[this.largeBucket] === this.goal) return this.largeBucket
    if (this.buckets[this.smallBucket] === this.goal) return this.smallBucket
    return null
  }

  get otherBucket(): number {
    return this.buckets[this.goalBucket === 'one' ? 'two' : 'one']
  }
}