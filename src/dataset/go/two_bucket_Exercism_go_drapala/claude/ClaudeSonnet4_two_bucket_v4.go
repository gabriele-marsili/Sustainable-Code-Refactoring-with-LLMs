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

	visited := make(map[bucketKey]bool)
	queue := []state{{amt1: 0, amt2: 0, moves: 0, path: []bucketKey{{0, 0}}}}
	
	if startBucket == "one" {
		queue[0].amt1 = sizeBucketOne
	} else {
		queue[0].amt2 = sizeBucketTwo
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		key := bucketKey{current.amt1, current.amt2}
		if visited[key] {
			continue
		}
		visited[key] = true

		if startBucket == "one" && current.amt1 == 0 && current.amt2 == sizeBucketTwo {
			continue
		}
		if startBucket == "two" && current.amt2 == 0 && current.amt1 == sizeBucketOne {
			continue
		}

		if current.amt1 == goalAmount {
			return "one", current.moves, current.amt2, nil
		}
		if current.amt2 == goalAmount {
			return "two", current.moves, current.amt1, nil
		}

		nextStates := generateNextStates(current, sizeBucketOne, sizeBucketTwo)
		for _, next := range nextStates {
			nextKey := bucketKey{next.amt1, next.amt2}
			if !visited[nextKey] {
				queue = append(queue, next)
			}
		}
	}

	return "", 0, 0, fmt.Errorf("no solution found")
}

type state struct {
	amt1, amt2 int
	moves      int
	path       []bucketKey
}

func generateNextStates(current state, size1, size2 int) []state {
	states := make([]state, 0, 6)
	newMoves := current.moves + 1

	from1to2 := MinInt(current.amt1, size2-current.amt2)
	from2to1 := MinInt(current.amt2, size1-current.amt1)

	candidates := []state{
		{current.amt1 - from1to2, current.amt2 + from1to2, newMoves, nil},
		{current.amt1 + from2to1, current.amt2 - from2to1, newMoves, nil},
		{0, current.amt2, newMoves, nil},
		{current.amt1, 0, newMoves, nil},
		{size1, current.amt2, newMoves, nil},
		{current.amt1, size2, newMoves, nil},
	}

	for _, candidate := range candidates {
		if candidate.amt1 != current.amt1 || candidate.amt2 != current.amt2 {
			states = append(states, candidate)
		}
	}

	return states
}