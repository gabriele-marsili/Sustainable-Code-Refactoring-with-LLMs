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
    this.buckets = { one: 0, two: 0 }
    this.bucketsSize = { one: bucketOne, two: bucketTwo }
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
    const { largeBucket, smallBucket, bucketsSize, buckets, goal } = this

    while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
      while (buckets[largeBucket] !== bucketsSize[largeBucket]) {
        buckets[smallBucket] = bucketsSize[smallBucket]
        moves++
        if (buckets[smallBucket] === goal || buckets[largeBucket] === goal) return moves

        const transfer = Math.min(buckets[smallBucket], bucketsSize[largeBucket] - buckets[largeBucket])
        buckets[smallBucket] -= transfer
        buckets[largeBucket] += transfer
        moves++
        if (buckets[smallBucket] === goal || buckets[largeBucket] === goal) return moves
      }

      buckets[largeBucket] = 0
      moves++
      if (buckets[smallBucket] === goal) return moves

      const transfer = Math.min(buckets[smallBucket], bucketsSize[largeBucket])
      buckets[smallBucket] -= transfer
      buckets[largeBucket] += transfer
      moves++
      if (buckets[smallBucket] === goal || buckets[largeBucket] === goal) return moves
    }

    return moves
  }

  largeBucketFirst(): number {
    let moves = 0
    const { largeBucket, smallBucket, bucketsSize, buckets, goal } = this

    while (buckets[largeBucket] !== goal && buckets[smallBucket] !== goal) {
      buckets[largeBucket] = bucketsSize[largeBucket]
      moves++
      if (buckets[largeBucket] === goal) return moves

      while (buckets[largeBucket] >= bucketsSize[smallBucket]) {
        const transfer = Math.min(buckets[largeBucket], bucketsSize[smallBucket] - buckets[smallBucket])
        buckets[largeBucket] -= transfer
        buckets[smallBucket] += transfer
        moves++
        if (buckets[smallBucket] === goal || buckets[largeBucket] === goal) return moves

        buckets[smallBucket] = 0
        moves++
        if (buckets[largeBucket] === goal) return moves
      }

      const transfer = Math.min(buckets[largeBucket], bucketsSize[smallBucket] - buckets[smallBucket])
      buckets[largeBucket] -= transfer
      buckets[smallBucket] += transfer
      moves++
      if (buckets[smallBucket] === goal || buckets[largeBucket] === goal) return moves
    }

    return moves
  }

  pourIntoBucket(sourceBucket: Bucket, targetBucket: Bucket): void {
    if (this.buckets[sourceBucket] === 0) return

    const addedVolume = Math.min(
      this.buckets[sourceBucket],
      this.bucketsSize[targetBucket] - this.buckets[targetBucket]
    )

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