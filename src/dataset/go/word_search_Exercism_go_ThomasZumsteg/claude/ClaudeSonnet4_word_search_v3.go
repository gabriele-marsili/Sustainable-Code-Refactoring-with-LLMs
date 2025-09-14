package wordsearch

import "strings"

const TestVersion = 1

type slice struct {
	word string
	pos  [2][2]int
}

func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	if len(words) == 0 || len(puzzle) == 0 {
		return make(map[string][2][2]int), nil
	}
	
	wordSet := make(map[string]bool, len(words))
	for _, word := range words {
		wordSet[word] = true
	}
	
	matches := make(map[string][2][2]int)
	rows := len(puzzle)
	
	for rStart := 0; rStart < rows; rStart++ {
		cols := len(puzzle[rStart])
		for cStart := 0; cStart < cols; cStart++ {
			start := [2]int{cStart, rStart}
			
			maxLen := max(cols-cStart, rows-rStart)
			for l := 2; l <= maxLen; l++ {
				if cStart+l <= cols {
					word := puzzle[rStart][cStart : cStart+l]
					if wordSet[word] {
						matches[word] = [2][2]int{start, {cStart + l - 1, rStart}}
					}
					if reversed := reverseString(word); wordSet[reversed] {
						matches[reversed] = [2][2]int{{cStart + l - 1, rStart}, start}
					}
				}
				
				if rStart+l <= rows {
					var sb strings.Builder
					sb.Grow(l)
					for i := 0; i < l; i++ {
						sb.WriteByte(puzzle[rStart+i][cStart])
					}
					word := sb.String()
					if wordSet[word] {
						matches[word] = [2][2]int{start, {cStart, rStart + l - 1}}
					}
					if reversed := reverseString(word); wordSet[reversed] {
						matches[reversed] = [2][2]int{{cStart, rStart + l - 1}, start}
					}
				}
				
				if rStart+l <= rows && cStart+l <= cols {
					var sb strings.Builder
					sb.Grow(l)
					for i := 0; i < l; i++ {
						sb.WriteByte(puzzle[rStart+i][cStart+i])
					}
					word := sb.String()
					if wordSet[word] {
						matches[word] = [2][2]int{start, {cStart + l - 1, rStart + l - 1}}
					}
					if reversed := reverseString(word); wordSet[reversed] {
						matches[reversed] = [2][2]int{{cStart + l - 1, rStart + l - 1}, start}
					}
				}
			}
		}
	}
	
	return matches, nil
}

func contains(match string, matches []string) bool {
	for _, m := range matches {
		if m == match {
			return true
		}
	}
	return false
}

func makeSlices(puzzle []string, slices chan slice) {
	var sliceList [3]slice
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; l+rStart <= len(row) || l+cStart < len(puzzle); l++ {
				rowWord := getRow(puzzle, rStart, cStart, l)
				rowStop := [2]int{cStart + l - 1, rStart}
				sliceList[0] = slice{rowWord, [2][2]int{start, rowStop}}

				colWord := getCol(puzzle, rStart, cStart, l)
				colStop := [2]int{cStart, rStart + l - 1}
				sliceList[1] = slice{colWord, [2][2]int{start, colStop}}

				diaWord := getDia(puzzle, rStart, cStart, l)
				diaStop := [2]int{cStart + l - 1, rStart + l - 1}
				sliceList[2] = slice{diaWord, [2][2]int{start, diaStop}}
				for _, s := range sliceList {
					if s.word != "" {
						slices <- s
						slices <- slice{reverse(s.word), [2][2]int{s.pos[1], s.pos[0]}}
					}
				}
			}
		}
	}
	close(slices)
}

func getDia(puzzle []string, row, col, length int) string {
	if len(puzzle) <= row+length || len(puzzle[row+length]) <= col+length {
		return ""
	}
	var sb strings.Builder
	sb.Grow(length)
	for i := 0; i < length; i++ {
		sb.WriteByte(puzzle[row+i][col+i])
	}
	return sb.String()
}

func getRow(puzzle []string, row, col, length int) string {
	if len(puzzle[row]) < col+length {
		return ""
	}
	return puzzle[row][col : col+length]
}

func getCol(puzzle []string, row, col, length int) string {
	if len(puzzle) < row+length {
		return ""
	}
	var sb strings.Builder
	sb.Grow(length)
	for i := row; i < row+length; i++ {
		sb.WriteByte(puzzle[i][col])
	}
	return sb.String()
}

func reverse(word string) string {
	return reverseString(word)
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}