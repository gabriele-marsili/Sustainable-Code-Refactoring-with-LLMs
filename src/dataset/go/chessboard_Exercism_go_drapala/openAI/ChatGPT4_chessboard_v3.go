package chessboard

type Rank [8]bool
type Chessboard map[string]Rank

func CountInRank(cb Chessboard, rank string) int {
	r, exists := cb[rank]
	if !exists {
		return 0
	}
	count := 0
	for _, value := range r {
		if value {
			count++
		}
	}
	return count
}

func CountInFile(cb Chessboard, file int) int {
	if file < 1 || file > 8 {
		return 0
	}
	count := 0
	for _, rank := range cb {
		if rank[file-1] {
			count++
		}
	}
	return count
}

func CountAll(cb Chessboard) int {
	return len(cb) * 8
}

func CountOccupied(cb Chessboard) int {
	count := 0
	for _, rank := range cb {
		for _, value := range rank {
			if value {
				count++
			}
		}
	}
	return count
}