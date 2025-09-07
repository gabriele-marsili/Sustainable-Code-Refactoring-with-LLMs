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

	visitedStates := make(map[bucketKey]bool)
	var solutionPath []bucketKey

	initialState := bucketKey{0, 0}
	if startBucket == "one" {
		initialState.bucket1 = sizeBucketOne
	} else {
		initialState.bucket2 = sizeBucketTwo
	}

	queue := []struct {
		state bucketKey
		moves int
		path  []bucketKey
	}{
		{initialState, 0, []bucketKey{initialState}},
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		state := current.state
		moves = current.moves
		path := current.path

		if visitedStates[state] {
			continue
		}
		visitedStates[state] = true

		if state.bucket1 == goalAmount || state.bucket2 == goalAmount {
			goalBucket = "one"
			otherBucket = state.bucket2
			if state.bucket2 == goalAmount {
				goalBucket = "two"
				otherBucket = state.bucket1
			}
			return goalBucket, moves, otherBucket, nil
		}

		from1to2 := MinInt(state.bucket1, sizeBucketTwo-state.bucket2)
		from2to1 := MinInt(state.bucket2, sizeBucketOne-state.bucket1)

		nextStates := []bucketKey{
			{0, state.bucket2},                              // Empty bucket 1
			{state.bucket1, 0},                              // Empty bucket 2
			{sizeBucketOne, state.bucket2},                  // Fill bucket 1
			{state.bucket1, sizeBucketTwo},                  // Fill bucket 2
			{state.bucket1 - from1to2, state.bucket2 + from1to2}, // Pour bucket 1 -> bucket 2
			{state.bucket1 + from2to1, state.bucket2 - from2to1}, // Pour bucket 2 -> bucket 1
		}

		for _, nextState := range nextStates {
			if !visitedStates[nextState] {
				newPath := append([]bucketKey{}, path...)
				newPath = append(newPath, nextState)
				queue = append(queue, struct {
					state bucketKey
					moves int
					path  []bucketKey
				}{nextState, moves + 1, newPath})
			}
		}
	}

	return "", 0, 0, fmt.Errorf("no solution found")
}