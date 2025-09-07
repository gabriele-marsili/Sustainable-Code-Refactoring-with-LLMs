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
	transfer := src.level
	if remaining := dst.capacity - dst.level; transfer > remaining {
		transfer = remaining
	}
	src.level -= transfer
	dst.level += transfer
}

func Solve(bucketOneCapacity, bucketTwoCapacity, goalAmount int, startBucket string) (goalBucket string, moves int, otherBucketLevel int, e error) {
	if bucketOneCapacity < 1 || bucketTwoCapacity < 1 || goalAmount < 1 {
		return "", 0, 0, errors.New("invalid parameters")
	}
	
	if startBucket != "one" && startBucket != "two" {
		return "", 0, 0, errors.New("invalid parameters")
	}

	one := &Bucket{"one", bucketOneCapacity, 0}
	two := &Bucket{"two", bucketTwoCapacity, 0}
	
	first, second := one, two
	if startBucket == "two" {
		first, second = two, one
	}

	for first.level != goalAmount && second.level != goalAmount {
		if first.IsEmpty() {
			first.Fill()
		} else if second.IsFull() {
			second.Empty()
		} else if first.capacity == goalAmount {
			first.Fill()
		} else if second.capacity == goalAmount {
			second.Fill()
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