package twobucket

import (
	"errors"
)

type Bucket struct {
	name     string
	capacity int
	level    int
}

func (b *Bucket) IsEmpty() bool {
	return b.level == 0
}

func (b *Bucket) IsFull() bool {
	return b.level == b.capacity
}

func (b *Bucket) Fill() {
	b.level = b.capacity
}

func (b *Bucket) Empty() {
	b.level = 0
}

func (src *Bucket) Transfer(dst *Bucket) {
	transferAmount := src.level
	if remaining := dst.capacity - dst.level; transferAmount > remaining {
		transferAmount = remaining
	}
	src.level -= transferAmount
	dst.level += transferAmount
}

func Solve(bucketOneCapacity, bucketTwoCapacity, goalAmount int, startBucket string) (goalBucket string, moves int, otherBucketLevel int, e error) {
	if bucketOneCapacity < 1 || bucketTwoCapacity < 1 || goalAmount < 1 {
		return "", 0, 0, errors.New("invalid parameters")
	}
	
	if startBucket != "one" && startBucket != "two" {
		return "", 0, 0, errors.New("invalid parameters")
	}

	if goalAmount == bucketOneCapacity {
		if startBucket == "one" {
			return "one", 1, 0, nil
		}
		return "one", 2, bucketTwoCapacity, nil
	}
	
	if goalAmount == bucketTwoCapacity {
		if startBucket == "two" {
			return "two", 1, 0, nil
		}
		return "two", 2, bucketOneCapacity, nil
	}

	one := &Bucket{"one", bucketOneCapacity, 0}
	two := &Bucket{"two", bucketTwoCapacity, 0}
	
	first := one
	second := two
	if startBucket == "two" {
		first, second = two, one
	}

	moves = 0
	for first.level != goalAmount && second.level != goalAmount {
		if first.IsEmpty() {
			first.Fill()
		} else if second.IsFull() {
			second.Empty()
		} else {
			first.Transfer(second)
		}
		moves++
	}
	
	if first.level == goalAmount {
		return first.name, moves, second.level, nil
	}
	return second.name, moves, first.level, nil
}

func isValidCapacity(capacity int) bool {
	return capacity >= 1
}

func isValidStartBucket(startBucket string) bool {
	return startBucket == "one" || startBucket == "two"
}