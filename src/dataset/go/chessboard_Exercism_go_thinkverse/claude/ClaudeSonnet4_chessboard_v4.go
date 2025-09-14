package chessboard

type File []bool

type Chessboard map[string]File

func CountInFile(cb Chessboard, file string) int {
	squares := 0
	fileData := cb[file]
	
	for i := 0; i < len(fileData); i++ {
		if fileData[i] {
			squares++
		}
	}

	return squares
}

func CountInRank(cb Chessboard, rank int) int {
	squares := 0
	rankIndex := rank - 1

	for _, file := range cb {
		if rankIndex < len(file) && file[rankIndex] {
			squares++
		}
	}

	return squares
}

func CountAll(cb Chessboard) int {
	squares := 0

	for _, file := range cb {
		squares += len(file)
	}

	return squares
}

func CountOccupied(cb Chessboard) int {
	squares := 0

	for _, file := range cb {
		for i := 0; i < len(file); i++ {
			if file[i] {
				squares++
			}
		}
	}

	return squares
}