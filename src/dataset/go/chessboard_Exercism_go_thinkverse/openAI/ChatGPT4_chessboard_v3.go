package chessboard

type File []bool
type Chessboard map[string]File

func CountInFile(cb Chessboard, file string) int {
	if f, exists := cb[file]; exists {
		count := 0
		for _, square := range f {
			if square {
				count++
			}
		}
		return count
	}
	return 0
}

func CountInRank(cb Chessboard, rank int) int {
	if rank < 1 || rank > 8 {
		return 0
	}
	count := 0
	for _, file := range cb {
		if rank-1 < len(file) && file[rank-1] {
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
	for _, file := range cb {
		for _, square := range file {
			if square {
				count++
			}
		}
	}
	return count
}