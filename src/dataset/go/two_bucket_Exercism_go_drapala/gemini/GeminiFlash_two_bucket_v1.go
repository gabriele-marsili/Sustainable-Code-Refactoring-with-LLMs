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

	visited := make(map[bucketKey]bool)
	queue := []bucketKey{}

	initialState := bucketKey{0, 0}
	if startBucket == "one" {
		initialState.bucket1 = sizeBucketOne
	} else {
		initialState.bucket2 = sizeBucketTwo
	}

	queue = append(queue, initialState)
	visited[initialState] = true

	paths := map[bucketKey][]bucketKey{
		initialState: {initialState},
	}

	var solvedPath []bucketKey
	solved := false

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if current.bucket1 == goalAmount || current.bucket2 == goalAmount {
			solved = true
			solvedPath = paths[current]
			break
		}

		// Possible moves
		movesArr := []bucketKey{
			{sizeBucketOne, current.bucket2},                         // Fill bucket one
			{current.bucket1, sizeBucketTwo},                         // Fill bucket two
			{0, current.bucket2},                                     // Empty bucket one
			{current.bucket1, 0},                                     // Empty bucket two
			{MinInt(sizeBucketOne, current.bucket1+current.bucket2), MaxInt(0, current.bucket1+current.bucket2-sizeBucketOne)}, // Pour from two to one
			{MaxInt(0, current.bucket1+current.bucket2-sizeBucketTwo), MinInt(sizeBucketTwo, current.bucket1+current.bucket2)}, // Pour from one to two
		}

		for _, next := range movesArr {
			if !visited[next] {
				visited[next] = true
				queue = append(queue, next)
				newPath := make([]bucketKey, len(paths[current]))
				copy(newPath, paths[current])
				newPath = append(newPath, next)
				paths[next] = newPath
			}
		}
	}

	if !solved {
		return "", 0, 0, fmt.Errorf("no solution found")
	}

	lastState := solvedPath[len(solvedPath)-1]
	moves = len(solvedPath) - 1

	if lastState.bucket1 == goalAmount {
		goalBucket = "one"
		otherBucket = lastState.bucket2
	} else {
		goalBucket = "two"
		otherBucket = lastState.bucket1
	}

	return goalBucket, moves, otherBucket, nil
}

func MaxInt(x, y int) int {
	if x > y {
		return x
	}
	return y
}