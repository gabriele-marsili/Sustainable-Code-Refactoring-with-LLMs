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
		bucket1, bucket2, moves int
	}

	queue := make([]state, 0, 100)
	visited := make(map[bucketKey]bool)

	// Initial state based on start bucket
	var initialState state
	if startBucket == "one" {
		initialState = state{sizeBucketOne, 0, 1}
	} else {
		initialState = state{0, sizeBucketTwo, 1}
	}

	queue = append(queue, initialState)
	visited[bucketKey{initialState.bucket1, initialState.bucket2}] = true

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		// Check if goal is reached
		if current.bucket1 == goalAmount {
			return "one", current.moves, current.bucket2, nil
		}
		if current.bucket2 == goalAmount {
			return "two", current.moves, current.bucket1, nil
		}

		// Generate next states
		nextStates := []state{
			// Pour bucket1 to bucket2
			{current.bucket1 - min(current.bucket1, sizeBucketTwo-current.bucket2),
				current.bucket2 + min(current.bucket1, sizeBucketTwo-current.bucket2),
				current.moves + 1},
			// Pour bucket2 to bucket1
			{current.bucket1 + min(current.bucket2, sizeBucketOne-current.bucket1),
				current.bucket2 - min(current.bucket2, sizeBucketOne-current.bucket1),
				current.moves + 1},
			// Empty bucket1
			{0, current.bucket2, current.moves + 1},
			// Empty bucket2
			{current.bucket1, 0, current.moves + 1},
			// Fill bucket1
			{sizeBucketOne, current.bucket2, current.moves + 1},
			// Fill bucket2
			{current.bucket1, sizeBucketTwo, current.moves + 1},
		}

		for _, next := range nextStates {
			key := bucketKey{next.bucket1, next.bucket2}
			
			// Skip invalid states
			if startBucket == "one" && next.bucket1 == 0 && next.bucket2 == sizeBucketTwo {
				continue
			}
			if startBucket == "two" && next.bucket2 == 0 && next.bucket1 == sizeBucketOne {
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