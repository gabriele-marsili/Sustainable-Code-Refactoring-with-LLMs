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

	initialState := bucketKey{0, 0}
	if startBucket == "one" {
		initialState.bucket1 = sizeBucketOne
	} else {
		initialState.bucket2 = sizeBucketTwo
	}

	visitedStates := make(map[bucketKey]bool)
	solutionStack := [][]bucketKey{}
	queue := []struct {
		state bucketKey
		path  []bucketKey
	}{
		{initialState, []bucketKey{initialState}},
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if visitedStates[current.state] {
			continue
		}
		visitedStates[current.state] = true

		if current.state.bucket1 == goalAmount || current.state.bucket2 == goalAmount {
			solutionStack = append(solutionStack, current.path)
			continue
		}

		amt1, amt2 := current.state.bucket1, current.state.bucket2
		from1to2 := MinInt(amt1, sizeBucketTwo-amt2)
		from2to1 := MinInt(amt2, sizeBucketOne-amt1)

		nextStates := []bucketKey{
			{amt1 - from1to2, amt2 + from1to2},
			{amt1 + from2to1, amt2 - from2to1},
			{0, amt2},
			{amt1, 0},
			{sizeBucketOne, amt2},
			{amt1, sizeBucketTwo},
		}

		for _, nextState := range nextStates {
			if !visitedStates[nextState] {
				newPath := append([]bucketKey{}, current.path...)
				newPath = append(newPath, nextState)
				queue = append(queue, struct {
					state bucketKey
					path  []bucketKey
				}{nextState, newPath})
			}
		}
	}

	if len(solutionStack) == 0 {
		return "", 0, 0, fmt.Errorf("no solution found")
	}

	smallestPath := solutionStack[0]
	for _, path := range solutionStack {
		if len(path) < len(smallestPath) {
			smallestPath = path
		}
	}

	finalState := smallestPath[len(smallestPath)-1]
	moves = len(smallestPath) - 1

	if finalState.bucket1 == goalAmount {
		goalBucket = "one"
		otherBucket = finalState.bucket2
	} else {
		goalBucket = "two"
		otherBucket = finalState.bucket1
	}

	return goalBucket, moves, otherBucket, nil
}