package chessboard

// Declare a type named File which stores if a square is occupied by a piece - this will be a slice of bools
type File []bool

// Declare a type named Chessboard which contains a map of eight Files, accessed with keys from "A" to "H"
type Chessboard map[string]File

// CountInFile returns how many squares are occupied in the chessboard,
// within the given file.
func CountInFile(cb Chessboard, file string) int {
	squares := 0
	for _, square := range cb[file] {
		if square {
			squares++
		}
	}
	return squares
}

// CountInRank returns how many squares are occupied in the chessboard,
// within the given rank.
func CountInRank(cb Chessboard, rank int) int {
	squares := 0
	if rank < 1 || rank > 8 {
		return 0
	}
	rank--
	for _, file := range cb {
		if rank < len(file) && file[rank] {
			squares++
		}
	}
	return squares
}

// CountAll should count how many squares are present in the chessboard.
func CountAll(cb Chessboard) int {
	totalFiles := len(cb)
	if totalFiles == 0 {
		return 0
	}
	squaresPerFile := 0
	for _, file := range cb {
		squaresPerFile = len(file)
		break
	}

	return totalFiles * squaresPerFile
}

// CountOccupied returns how many squares are occupied in the chessboard.
func CountOccupied(cb Chessboard) int {
	squares := 0
	for _, file := range cb {
		for _, square := range file {
			if square {
				squares++
			}
		}
	}
	return squares
}