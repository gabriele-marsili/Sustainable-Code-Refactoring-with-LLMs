package twobucket

import (
	"errors"
)

type Bucket struct {
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

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func Solve(bucketOneCapacity, bucketTwoCapacity, goalAmount int, startBucket string) (goalBucket string, moves int, otherBucketLevel int, e error) {
	if bucketOneCapacity <= 0 || bucketTwoCapacity <= 0 || (startBucket != "one" && startBucket != "two") || goalAmount < 1 {
		return "", 0, 0, errors.New("invalid parameters")
	}

	one := &Bucket{bucketOneCapacity, 0}
	two := &Bucket{bucketTwoCapacity, 0}
	var first *Bucket
	var second *Bucket
	firstName := "one"
	secondName := "two"

	if startBucket == "one" {
		first, second = one, two
	} else {
		first, second = two, one
		firstName, secondName = secondName, firstName
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
		if moves > 100000 {
			return "", 0, 0, errors.New("unsolvable")
		}
	}

	if first.level == goalAmount {
		return firstName, moves, second.level, nil
	}
	return secondName, moves, first.level, nil
}