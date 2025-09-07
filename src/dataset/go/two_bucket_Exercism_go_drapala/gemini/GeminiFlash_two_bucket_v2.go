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

	var initialBucket1, initialBucket2 int
	if startBucket == "one" {
		initialBucket1 = sizeBucketOne
	} else {
		initialBucket2 = sizeBucketTwo
	}

	visited[bucketKey{0, 0}] = true
	path := make(map[bucketKey]bucketKey)
	found := false

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		amt1 := current.bucket1
		amt2 := current.bucket2

		if amt1 == goalAmount || amt2 == goalAmount {
			found = true
			break
		}

		// Possible actions
		actions := []func(int, int) (int, int){
			// Pour from bucket1 to bucket2
			func(a1, a2 int) (int, int) {
				pour := MinInt(a1, sizeBucketTwo-a2)
				return a1 - pour, a2 + pour
			},
			// Pour from bucket2 to bucket1
			func(a1, a2 int) (int, int) {
				pour := MinInt(a2, sizeBucketOne-a1)
				return a1 + pour, a2 - pour
			},
			// Empty bucket1
			func(a1, a2 int) (int, int) {
				return 0, a2
			},
			// Empty bucket2
			func(a1, a2 int) (int, int) {
				return a1, 0
			},
			// Fill bucket1
			func(a1, a2 int) (int, int) {
				return sizeBucketOne, a2
			},
			// Fill bucket2
			func(a1, a2 int) (int, int) {
				return a1, sizeBucketTwo
			},
		}

		for _, action := range actions {
			newAmt1, newAmt2 := action(amt1, amt2)
			nextKey := bucketKey{newAmt1, newAmt2}

			if !visited[nextKey] {
				visited[nextKey] = true
				queue = append(queue, nextKey)
				path[nextKey] = current
			}
		}
	}

	if !found {
		return "", 0, 0, fmt.Errorf("no solution found")
	}

	var solutionPath []bucketKey
	currentKey := bucketKey{}

	for k, v := range visited {
		if (k.bucket1 == goalAmount || k.bucket2 == goalAmount) && v {
			currentKey = k
			break
		}
	}

	for currentKey != (bucketKey{0, 0}) {
		solutionPath = append([]bucketKey{currentKey}, solutionPath...)
		currentKey = path[currentKey]
	}
	solutionPath = append([]bucketKey{{0, 0}}, solutionPath...)

	moves = len(solutionPath) - 1
	sol1 := solutionPath[len(solutionPath)-1].bucket1
	sol2 := solutionPath[len(solutionPath)-1].bucket2

	if sol1 == goalAmount {
		goalBucket = "one"
		otherBucket = sol2
	} else {
		goalBucket = "two"
		otherBucket = sol1
	}

	return goalBucket, moves, otherBucket, err
}