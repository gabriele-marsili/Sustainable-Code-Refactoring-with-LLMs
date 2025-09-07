package twobucket

import "fmt"

type bucketKey struct {
	bucket1 int
	bucket2 int
}

func Solve(sizeBucketOne, sizeBucketTwo, goalAmount int, startBucket string) (string, int, int, error) {
	// Error handling
	if sizeBucketOne <= 0 || sizeBucketTwo <= 0 || goalAmount <= 0 {
		return "", 0, 0, fmt.Errorf("invalid bucket sizes")
	}
	if startBucket != "one" && startBucket != "two" {
		return "", 0, 0, fmt.Errorf("invalid start bucket name")
	}

	// Use BFS for optimal solution
	type state struct {
		amt1, amt2, moves int
		path              []bucketKey
	}

	queue := make([]state, 0, 100)
	visited := make(map[bucketKey]bool)

	// Initial state
	var initialState state
	if startBucket == "one" {
		initialState = state{sizeBucketOne, 0, 1, []bucketKey{{0, 0}, {sizeBucketOne, 0}}}
	} else {
		initialState = state{0, sizeBucketTwo, 1, []bucketKey{{0, 0}, {0, sizeBucketTwo}}}
	}

	queue = append(queue, initialState)
	visited[bucketKey{initialState.amt1, initialState.amt2}] = true

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		// Check if goal is reached
		if current.amt1 == goalAmount {
			return "one", current.moves, current.amt2, nil
		}
		if current.amt2 == goalAmount {
			return "two", current.moves, current.amt1, nil
		}

		// Generate next states
		nextStates := []state{
			// Pour bucket1 to bucket2
			{current.amt1 - min(current.amt1, sizeBucketTwo-current.amt2), 
			 current.amt2 + min(current.amt1, sizeBucketTwo-current.amt2), 
			 current.moves + 1, nil},
			// Pour bucket2 to bucket1
			{current.amt1 + min(current.amt2, sizeBucketOne-current.amt1), 
			 current.amt2 - min(current.amt2, sizeBucketOne-current.amt1), 
			 current.moves + 1, nil},
			// Empty bucket1
			{0, current.amt2, current.moves + 1, nil},
			// Empty bucket2
			{current.amt1, 0, current.moves + 1, nil},
			// Fill bucket1
			{sizeBucketOne, current.amt2, current.moves + 1, nil},
			// Fill bucket2
			{current.amt1, sizeBucketTwo, current.moves + 1, nil},
		}

		for _, next := range nextStates {
			key := bucketKey{next.amt1, next.amt2}
			
			// Skip invalid states
			if startBucket == "one" && next.amt1 == 0 && next.amt2 == sizeBucketTwo {
				continue
			}
			if startBucket == "two" && next.amt2 == 0 && next.amt1 == sizeBucketOne {
				continue
			}
			
			if !visited[key] {
				visited[key] = true
				queue = append(queue, next)
			}
		}
	}

	return "", 0, 0, fmt.Errorf("no solution found")
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}