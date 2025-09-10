package chessboard

// Declare a type named Rank which stores if a square is occupied by a piece - this will be a slice of bools
type Rank = []bool

// Declare a type named Chessboard contains a map of eight Ranks, accessed with values from 1 to 8
type Chessboard map[int]Rank

// CountInRank returns how many squares are occupied in the chessboard,
// within the given rank
func CountInRank(cb Chessboard, rank int) int {
	count := 0
	row, ok := cb[rank]
	if !ok {
		return 0
	}
	for _, square := range row {
		if square {
			count++
		}
	}
	return count
}

// CountInFile returns how many squares are occupied in the chessboard,
// within the given file
func CountInFile(cb Chessboard, file int) int {
	if file < 1 || file > 8 {
		return 0
	}

	count := 0
	for i := 1; i <= 8; i++ {
		rank, ok := cb[i]
		if !ok {
			continue
		}
		if len(rank) >= file && rank[file-1] {
			count++
		}
	}
	return count
}

// CountAll should count how many squares are present in the chessboard
func CountAll(cb Chessboard) int {
	totalSquares := 0
	for _, rank := range cb {
		totalSquares += len(rank)
	}
	return totalSquares
}

// CountOccupied returns how many squares are occupied in the chessboard
func CountOccupied(cb Chessboard) int {
	occupiedSquares := 0
	for _, rank := range cb {
		for _, square := range rank {
			if square {
				occupiedSquares++
			}
		}
	}
	return occupiedSquares
}