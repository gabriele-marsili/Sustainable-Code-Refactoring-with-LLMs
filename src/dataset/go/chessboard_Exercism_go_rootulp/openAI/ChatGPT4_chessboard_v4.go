package chessboard

type Rank = []bool
type Chessboard map[int]Rank

func CountInRank(cb Chessboard, rank int) int {
	if r, ok := cb[rank]; ok {
		count := 0
		for _, square := range r {
			if square {
				count++
			}
		}
		return count
	}
	return 0
}

func CountInFile(cb Chessboard, file int) int {
	if file < 1 || file > 8 {
		return 0
	}
	count := 0
	for _, rank := range cb {
		if len(rank) >= file && rank[file-1] {
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
		for _, square := range rank {
			if square {
				count++
			}
		}
	}
	return count
}