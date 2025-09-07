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
	queue := []bucketKey{}
	path := make(map[bucketKey]bucketKey)
	distances := make(map[bucketKey]int)

	initialState := bucketKey{0, 0}
	if startBucket == "one" {
		initialState.bucket1 = sizeBucketOne
	} else {
		initialState.bucket2 = sizeBucketTwo
	}

	visited[initialState] = true
	queue = append(queue, initialState)
	distances[initialState] = 1

	var finalState bucketKey
	found := false

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if current.bucket1 == goalAmount || current.bucket2 == goalAmount {
			finalState = current
			found = true
			break
		}

		// Possible actions
		actions := []func(bucketKey) bucketKey{
			// Pour one bucket into the other
			func(state bucketKey) bucketKey {
				pour := MinInt(state.bucket1, sizeBucketTwo-state.bucket2)
				return bucketKey{state.bucket1 - pour, state.bucket2 + pour}
			},
			func(state bucketKey) bucketKey {
				pour := MinInt(state.bucket2, sizeBucketOne-state.bucket1)
				return bucketKey{state.bucket1 + pour, state.bucket2 - pour}
			},
			// Empty a bucket
			func(state bucketKey) bucketKey { return bucketKey{0, state.bucket2} },
			func(state bucketKey) bucketKey { return bucketKey{state.bucket1, 0} },
			// Fill a bucket
			func(state bucketKey) bucketKey { return bucketKey{sizeBucketOne, state.bucket2} },
			func(state bucketKey) bucketKey { return bucketKey{state.bucket1, sizeBucketTwo} },
		}

		for _, action := range actions {
			nextState := action(current)
			if !visited[nextState] {
				visited[nextState] = true
				queue = append(queue, nextState)
				path[nextState] = current
				distances[nextState] = distances[current] + 1
			}
		}
	}

	if !found {
		err = fmt.Errorf("no solution found")
		return "", 0, 0, err
	}

	moves = distances[finalState] - 1

	if finalState.bucket1 == goalAmount {
		goalBucket = "one"
		otherBucket = finalState.bucket2
	} else {
		goalBucket = "two"
		otherBucket = finalState.bucket1
	}

	return goalBucket, moves, otherBucket, err
}