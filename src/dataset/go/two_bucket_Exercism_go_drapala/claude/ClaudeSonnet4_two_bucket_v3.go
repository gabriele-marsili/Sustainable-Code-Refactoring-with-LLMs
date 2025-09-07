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
	queue := []state{{bucketKey{0, 0}, 0, nil}}
	
	if startBucket == "one" {
		queue[0].key.bucket1 = sizeBucketOne
	} else {
		queue[0].key.bucket2 = sizeBucketTwo
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if visited[current.key] {
			continue
		}
		visited[current.key] = true

		if current.key.bucket1 == goalAmount {
			return "one", current.moves, current.key.bucket2, nil
		}
		if current.key.bucket2 == goalAmount {
			return "two", current.moves, current.key.bucket1, nil
		}

		if isValidState(current.key, sizeBucketOne, sizeBucketTwo, startBucket) {
			queue = append(queue, generateNextStates(current, sizeBucketOne, sizeBucketTwo, visited)...)
		}
	}

	return "", 0, 0, fmt.Errorf("no solution found")
}

type state struct {
	key   bucketKey
	moves int
	prev  *state
}

func isValidState(key bucketKey, size1, size2 int, startBucket string) bool {
	if startBucket == "one" && key.bucket1 == 0 && key.bucket2 == size2 {
		return false
	}
	if startBucket == "two" && key.bucket2 == 0 && key.bucket1 == size1 {
		return false
	}
	return true
}

func generateNextStates(current state, size1, size2 int, visited map[bucketKey]bool) []state {
	amt1, amt2 := current.key.bucket1, current.key.bucket2
	nextMoves := current.moves + 1
	var states []state

	actions := []bucketKey{
		{amt1 - MinInt(amt1, size2-amt2), amt2 + MinInt(amt1, size2-amt2)},
		{amt1 + MinInt(amt2, size1-amt1), amt2 - MinInt(amt2, size1-amt1)},
		{0, amt2},
		{amt1, 0},
		{size1, amt2},
		{amt1, size2},
	}

	for _, action := range actions {
		if !visited[action] {
			states = append(states, state{action, nextMoves, &current})
		}
	}

	return states
}

func smallestPathInStack(solutionStack *[][]bucketKey) []bucketKey {
	if len(*solutionStack) == 0 {
		return nil
	}
	
	smallestPath := (*solutionStack)[0]
	for _, path := range (*solutionStack)[1:] {
		if len(path) < len(smallestPath) {
			smallestPath = path
		}
	}
	return smallestPath
}

func visited(key bucketKey, solutionPath []bucketKey) bool {
	for _, v := range solutionPath {
		if v == key {
			return true
		}
	}
	return false
}

func pathInStack(solutionPath []bucketKey, solutionStack *[][]bucketKey) bool {
	for _, path := range *solutionStack {
		if len(path) <= len(solutionPath) {
			match := true
			for i, key := range path {
				if i >= len(solutionPath) || key != solutionPath[i] {
					match = false
					break
				}
			}
			if match {
				return true
			}
		}
	}
	return false
}

func bucketSolver(startBucket string, amt1, size1, amt2, size2, goal int, solutionPath []bucketKey, solutionStack *[][]bucketKey) bool {
	if (startBucket == "one" && amt1 == 0 && amt2 == size2) || (startBucket == "two" && amt2 == 0 && amt1 == size1) {
		return false
	}

	currentKey := bucketKey{amt1, amt2}
	
	if (amt1 == goal || amt2 == goal) && !visited(currentKey, solutionPath) {
		newPath := append(solutionPath, currentKey)
		if !pathInStack(newPath, solutionStack) {
			*solutionStack = append(*solutionStack, newPath)
			return true
		}
		return false
	}

	if visited(currentKey, solutionPath) {
		return false
	}

	newPath := append(solutionPath, currentKey)
	from1to2 := MinInt(amt1, size2-amt2)
	from2to1 := MinInt(amt2, size1-amt1)

	return bucketSolver(startBucket, amt1-from1to2, size1, amt2+from1to2, size2, goal, newPath, solutionStack) ||
		bucketSolver(startBucket, amt1+from2to1, size1, amt2-from2to1, size2, goal, newPath, solutionStack) ||
		bucketSolver(startBucket, 0, size1, amt2, size2, goal, newPath, solutionStack) ||
		bucketSolver(startBucket, amt1, size1, 0, size2, goal, newPath, solutionStack) ||
		bucketSolver(startBucket, size1, size1, amt2, size2, goal, newPath, solutionStack) ||
		bucketSolver(startBucket, amt1, size1, size2, size2, goal, newPath, solutionStack)
}