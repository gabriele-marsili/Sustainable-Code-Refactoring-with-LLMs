package twobucket

import "fmt"

type bucketKey struct {
	bucket1 int
	bucket2 int
}

func Solve(sizeBucketOne, sizeBucketTwo, goalAmount int, startBucket string) (string, int, int, error) {
	if sizeBucketOne <= 0 || sizeBucketTwo <= 0 || goalAmount <= 0 {
		return "", 0, 0, fmt.Errorf("invalid bucket sizes")
	}
	if startBucket != "one" && startBucket != "two" {
		return "", 0, 0, fmt.Errorf("invalid start bucket name")
	}

	visited := make(map[bucketKey]bool)
	queue := []struct {
		bucket1, bucket2, moves int
	}{
		{0, 0, 0},
	}

	if startBucket == "one" {
		queue[0].bucket1 = sizeBucketOne
	} else {
		queue[0].bucket2 = sizeBucketTwo
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if current.bucket1 == goalAmount {
			return "one", current.moves, current.bucket2, nil
		}
		if current.bucket2 == goalAmount {
			return "two", current.moves, current.bucket1, nil
		}

		state := bucketKey{current.bucket1, current.bucket2}
		if visited[state] {
			continue
		}
		visited[state] = true

		queue = append(queue,
			struct{ bucket1, bucket2, moves int }{0, current.bucket2, current.moves + 1}, // Empty bucket 1
			struct{ bucket1, bucket2, moves int }{current.bucket1, 0, current.moves + 1}, // Empty bucket 2
			struct{ bucket1, bucket2, moves int }{sizeBucketOne, current.bucket2, current.moves + 1}, // Fill bucket 1
			struct{ bucket1, bucket2, moves int }{current.bucket1, sizeBucketTwo, current.moves + 1}, // Fill bucket 2,
			struct{ bucket1, bucket2, moves int }{ // Pour bucket 1 into bucket 2
				current.bucket1 - min(current.bucket1, sizeBucketTwo-current.bucket2),
				current.bucket2 + min(current.bucket1, sizeBucketTwo-current.bucket2),
				current.moves + 1,
			},
			struct{ bucket1, bucket2, moves int }{ // Pour bucket 2 into bucket 1
				current.bucket1 + min(current.bucket2, sizeBucketOne-current.bucket1),
				current.bucket2 - min(current.bucket2, sizeBucketOne-current.bucket1),
				current.moves + 1,
			},
		)
	}

	return "", 0, 0, fmt.Errorf("no solution found")
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}