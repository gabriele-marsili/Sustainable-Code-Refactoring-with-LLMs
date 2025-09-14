package chessboard

type Rank = []bool

type Chessboard map[int]Rank

func CountInRank(cb Chessboard, rank int) int {
	count := 0
	rankData := cb[rank]
	for i := 0; i < len(rankData); i++ {
		if rankData[i] {
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
		if rank[fileIndex] {
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
		for i := 0; i < len(rank); i++ {
			if rank[i] {
				count++
			}
		}
	}
	return count
}