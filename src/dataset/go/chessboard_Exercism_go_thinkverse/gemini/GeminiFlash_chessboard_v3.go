package chessboard

// Declare a type named File which stores if a square is occupied by a piece - this will be a slice of bools
type File []bool

// Declare a type named Chessboard which contains a map of eight Files, accessed with keys from "A" to "H"
type Chessboard map[string]File

// CountInFile returns how many squares are occupied in the chessboard,
// within the given file.
func CountInFile(cb Chessboard, file string) int {
	count := 0
	for _, square := range cb[file] {
		if square {
			count++
		}
	}
	return count
}

// CountInRank returns how many squares are occupied in the chessboard,
// within the given rank.
func CountInRank(cb Chessboard, rank int) int {
	count := 0
	rankIndex := rank - 1
	for _, file := range cb {
		if rankIndex >= 0 && rankIndex < len(file) && file[rankIndex] {
			count++
		}
	}
	return count
}

// CountAll should count how many squares are present in the chessboard.
func CountAll(cb Chessboard) int {
	totalSquares := 0
	for _, file := range cb {
		totalSquares += len(file)
	}
	return totalSquares
}

// CountOccupied returns how many squares are occupied in the chessboard.
func CountOccupied(cb Chessboard) int {
	totalOccupied := 0
	for _, file := range cb {
		for _, square := range file {
			if square {
				totalOccupied++
			}
		}
	}
	return totalOccupied
}