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
    return this.starterBucket === this.largeBucket 
      ? this.largeBucketFirst() 
      : this.smallBucketFirst()
  }

  smallBucketFirst(): number {
    let moves = 0

    while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
      while (this.buckets[this.largeBucket] !== this.bucketsSize[this.largeBucket]) {
        this.fillBucket(this.smallBucket)
        moves++
        if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal) return moves

        this.pourIntoBucket(this.smallBucket, this.largeBucket)
        moves++
        if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal) return moves
      }

      this.emptyBucket(this.largeBucket)
      moves++
      if (this.buckets[this.smallBucket] === this.goal) return moves

      this.pourIntoBucket(this.smallBucket, this.largeBucket)
      moves++
      if (this.buckets[this.smallBucket] === this.goal || this.buckets[this.largeBucket] === this.goal) return moves
    }

    return moves
  }

  largeBucketFirst(): number {
    let moves = 0

    while (this.buckets[this.largeBucket] !== this.goal && this.buckets[this.smallBucket] !== this.goal) {
      this.fillBucket(this.largeBucket)
      moves++
      if (this.buckets[this.largeBucket] === this.goal) return moves

      while (this.buckets[this.largeBucket] >= this.bucketsSize[this.smallBucket]) {
        this.pourIntoBucket(this.largeBucket, this.smallBucket)
        moves++
        if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves

        this.emptyBucket(this.smallBucket)
        moves++
        if (this.buckets[this.largeBucket] === this.goal) return moves
      }

      this.pourIntoBucket(this.largeBucket, this.smallBucket)
      moves++
      if (this.buckets[this.largeBucket] === this.goal || this.buckets[this.smallBucket] === this.goal) return moves
    }

    return moves
  }

  pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    const sourceVolume = this.buckets[sourceBucket]
    if (sourceVolume === 0) return

    const availableSpace = this.bucketsSize[targetBucket] - this.buckets[targetBucket]
    const transferVolume = Math.min(availableSpace, sourceVolume)

    this.buckets[targetBucket] += transferVolume
    this.buckets[sourceBucket] -= transferVolume
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