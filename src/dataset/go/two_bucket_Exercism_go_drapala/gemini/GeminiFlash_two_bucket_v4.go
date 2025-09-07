package twobucket

import "fmt"

type bucketKey struct {
	bucket1 int
	bucket2 int
}

func MinInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func Solve(sizeBucketOne, sizeBucketTwo, goalAmount int, startBucket string) (string, int, int, error) {
	if sizeBucketOne <= 0 || sizeBucketTwo <= 0 || goalAmount <= 0 {
		return "", 0, 0, fmt.Errorf("invalid bucket sizes")
	}
	if startBucket != "one" && startBucket != "two" {
		return "", 0, 0, fmt.Errorf("invalid start bucket name")
	}

	var goalBucket string
	var moves int
	var otherBucket int
	var err error

	visited := make(map[bucketKey]bool)
	queue := []bucketKey{{0, 0}}

	initialBucketOne := 0
	initialBucketTwo := 0

	if startBucket == "one" {
		initialBucketOne = sizeBucketOne
	} else {
		initialBucketTwo = sizeBucketTwo
	}

	queue = append(queue, bucketKey{initialBucketOne, initialBucketTwo})
	visited[bucketKey{0, 0}] = true
	visited[bucketKey{initialBucketOne, initialBucketTwo}] = true

	pathLength := make(map[bucketKey]int)
	pathLength[bucketKey{initialBucketOne, initialBucketTwo}] = 1

	found := false

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if current.bucket1 == goalAmount {
			goalBucket = "one"
			otherBucket = current.bucket2
			moves = pathLength[current] - 1
			found = true
			break
		}

		if current.bucket2 == goalAmount {
			goalBucket = "two"
			otherBucket = current.bucket1
			moves = pathLength[current] - 1
			found = true
			break
		}

		// Possible actions
		actions := []func(bucketKey) bucketKey{
			func(bk bucketKey) bucketKey { // Pour 1 into 2
				pour := MinInt(bk.bucket1, sizeBucketTwo-bk.bucket2)
				return bucketKey{bk.bucket1 - pour, bk.bucket2 + pour}
			},
			func(bk bucketKey) bucketKey { // Pour 2 into 1
				pour := MinInt(bk.bucket2, sizeBucketOne-bk.bucket1)
				return bucketKey{bk.bucket1 + pour, bk.bucket2 - pour}
			},
			func(bk bucketKey) bucketKey { // Empty 1
				return bucketKey{0, bk.bucket2}
			},
			func(bk bucketKey) bucketKey { // Empty 2
				return bucketKey{bk.bucket1, 0}
			},
			func(bk bucketKey) bucketKey { // Fill 1
				return bucketKey{sizeBucketOne, bk.bucket2}
			},
			func(bk bucketKey) bucketKey { // Fill 2
				return bucketKey{bk.bucket1, sizeBucketTwo}
			},
		}

		for _, action := range actions {
			nextState := action(current)
			if !visited[nextState] {
				queue = append(queue, nextState)
				visited[nextState] = true
				pathLength[nextState] = pathLength[current] + 1
			}
		}
	}

	if !found {
		err = fmt.Errorf("no solution found")
		return "", 0, 0, err
	}

	return goalBucket, moves, otherBucket, err
}