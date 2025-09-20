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
	transferAmount := min(src.level, dst.capacity-dst.level)
	src.level -= transferAmount
	dst.level += transferAmount
}

func Solve(bucketOneCapacity, bucketTwoCapacity, goalAmount int, startBucket string) (goalBucket string, moves int, otherBucketLevel int, e error) {
	if bucketOneCapacity < 1 || bucketTwoCapacity < 1 || goalAmount < 1 || (startBucket != "one" && startBucket != "two") {
		return "", 0, 0, errors.New("invalid parameters")
	}

	one := &Bucket{"one", bucketOneCapacity, 0}
	two := &Bucket{"two", bucketTwoCapacity, 0}
	first, second := one, two
	if startBucket == "two" {
		first, second = two, one
	}

	for moves = 0; first.level != goalAmount && second.level != goalAmount; moves++ {
		switch {
		case first.IsEmpty():
			first.Fill()
		case second.IsFull():
			second.Empty()
		case first.capacity == goalAmount:
			first.Fill()
		case second.capacity == goalAmount:
			second.Fill()
		default:
			first.Transfer(second)
		}
	}

	if first.level == goalAmount {
		return first.name, moves, second.level, nil
	}
	return second.name, moves, first.level, nil
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}