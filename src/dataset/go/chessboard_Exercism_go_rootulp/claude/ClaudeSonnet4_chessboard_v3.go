package chessboard

type Rank = []bool

type Chessboard map[int]Rank

func CountInRank(cb Chessboard, rank int) int {
	count := 0
	for _, square := range cb[rank] {
		if square {
			count++
		}
	}
	return count
}

func CountInFile(cb Chessboard, file int) int {
	if file > 8 || file < 1 {
		return 0
	}
	count := 0
	fileIndex := file - 1
	for _, rank := range cb {
		if len(rank) > fileIndex && rank[fileIndex] {
			count++
		}
	}
	return count
}

func CountAll(cb Chessboard) int {
	count := 0
	for _, rank := range cb {
		count += len(rank)
	}
	return count
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