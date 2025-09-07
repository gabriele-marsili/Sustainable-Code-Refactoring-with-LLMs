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
    const { buckets, bucketsSize, goal, largeBucket, smallBucket } = this

    while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
      while (buckets[largeBucket] !== bucketsSize[largeBucket]) {
        buckets[smallBucket] = bucketsSize[smallBucket]
        moves++
        if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves

        this.pourIntoBucket(smallBucket, largeBucket)
        moves++
        if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves
      }

      buckets[largeBucket] = 0
      moves++
      if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves

      this.pourIntoBucket(smallBucket, largeBucket)
      moves++
      if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves
    }

    return moves
  }

  largeBucketFirst(): number {
    let moves = 0
    const { buckets, bucketsSize, goal, largeBucket, smallBucket } = this

    while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
      buckets[largeBucket] = bucketsSize[largeBucket]
      moves++
      if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves

      while (buckets[largeBucket] >= bucketsSize[smallBucket]) {
        this.pourIntoBucket(largeBucket, smallBucket)
        moves++
        if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves

        buckets[smallBucket] = 0
        moves++
        if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves
      }

      this.pourIntoBucket(largeBucket, smallBucket)
      moves++
      if (buckets[largeBucket] === goal || buckets[smallBucket] === goal) return moves
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
    const { buckets, goal, largeBucket, smallBucket } = this
    if (buckets[largeBucket] === goal) return largeBucket
    if (buckets[smallBucket] === goal) return smallBucket
    return null
  }

  get otherBucket(): number {
    return this.buckets[this.goalBucket === 'one' ? 'two' : 'one']
  }
}