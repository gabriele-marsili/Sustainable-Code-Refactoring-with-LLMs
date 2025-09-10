package wordsearch

import (
	"errors"
	"strings"
)

type board struct {
	rows  int
	cols  int
	words []string
}

type wordmap struct {
	word  strings.Builder
	coord [2][2]int
}

// top -> bottom
func (b *board) top2bottom() []wordmap {
	wm := make([]wordmap, b.cols)
	for c := 0; c < b.cols; c++ {
		wm[c].coord[0] = [2]int{c, 0}
		wm[c].coord[1] = [2]int{c, b.rows - 1}
		wm[c].word.Grow(b.rows)
		for r := 0; r < b.rows; r++ {
			wm[c].word.WriteByte(b.words[r][c])
		}
	}
	return wm
}

// bottom -> top
func (b *board) bottom2top() []wordmap {
	wm := make([]wordmap, b.cols)
	for c := 0; c < b.cols; c++ {
		wm[c].coord[0] = [2]int{c, b.rows - 1}
		wm[c].coord[1] = [2]int{c, 0}
		wm[c].word.Grow(b.rows)
		for r := b.rows - 1; r >= 0; r-- {
			wm[c].word.WriteByte(b.words[r][c])
		}
	}
	return wm
}

// left -> right
func (b *board) left2right() []wordmap {
	wm := make([]wordmap, b.rows)
	for r := 0; r < b.rows; r++ {
		wm[r].coord[0] = [2]int{0, r}
		wm[r].coord[1] = [2]int{b.cols - 1, r}
		wm[r].word.Grow(b.cols)
		for c := 0; c < b.cols; c++ {
			wm[r].word.WriteByte(b.words[r][c])
		}
	}
	return wm
}

// right -> left
func (b *board) right2left() []wordmap {
	wm := make([]wordmap, b.rows)
	for r := 0; r < b.rows; r++ {
		wm[r].coord[0] = [2]int{b.cols - 1, r}
		wm[r].coord[1] = [2]int{0, r}
		wm[r].word.Grow(b.cols)
		for c := b.cols - 1; c >= 0; c-- {
			wm[r].word.WriteByte(b.words[r][c])
		}
	}
	return wm
}

// top-left -> bottom-right
func (b *board) topleft2bottomright() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	for c := 0; c < b.cols; c++ {
		loopDiagonal(r, c, b, wm, &i, 1, 1)
	}
	for r := 1; r < b.rows; r++ {
		loopDiagonal(r, 0, b, wm, &i, 1, 1)
	}
	return wm
}

// bottom-right -> top-left
func (b *board) bottomright2topleft() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	for c := b.cols - 1; c >= 0; c-- {
		loopDiagonal(b.rows-1, c, b, wm, &i, -1, -1)
	}
	for r := b.rows - 2; r >= 0; r-- {
		loopDiagonal(r, b.cols-1, b, wm, &i, -1, -1)
	}
	return wm
}

// top-right -> bottom-left
func (b *board) topright2bottomleft() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	for c := b.cols - 1; c >= 0; c-- {
		loopDiagonal(0, c, b, wm, &i, 1, -1)
	}
	for r := 1; r < b.rows; r++ {
		loopDiagonal(r, b.cols-1, b, wm, &i, 1, -1)
	}
	return wm
}

// bottom-left -> top-right
func (b *board) bottomleft2topright() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	for c := 0; c < b.cols; c++ {
		loopDiagonal(b.rows-1, c, b, wm, &i, -1, 1)
	}
	for r := b.rows - 2; r >= 0; r-- {
		loopDiagonal(r, 0, b, wm, &i, -1, 1)
	}
	return wm
}

// Helper for diagonal loops
func loopDiagonal(r, c int, b *board, wm []wordmap, i *int, dr, dc int) {
	wm[*i].coord[0] = [2]int{c, r}
	wm[*i].word.Grow(min(b.rows, b.cols))
	diag_r, diag_c := r, c
	for diag_r >= 0 && diag_r < b.rows && diag_c >= 0 && diag_c < b.cols {
		wm[*i].word.WriteByte(b.words[diag_r][diag_c])
		diag_r += dr
		diag_c += dc
	}
	wm[*i].coord[1] = [2]int{diag_c - dc, diag_r - dr}
	*i++
}

// Main function
func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	b := board{
		rows:  len(puzzle),
		cols:  len(puzzle[0]),
		words: puzzle,
	}

	for _, row := range puzzle {
		if len(row) != b.cols {
			return nil, errors.New("puzzle is not rectangular")
		}
	}

	searchlist := [][]wordmap{
		b.top2bottom(), b.bottom2top(),
		b.left2right(), b.right2left(),
		b.topleft2bottomright(), b.bottomright2topleft(),
		b.topright2bottomleft(), b.bottomleft2topright(),
	}

	coords := make(map[string][2][2]int)
	for _, word := range words {
		found := false
		for s, search := range searchlist {
			index, shift := findwordinslice(word, search)
			if index != -1 {
				first, second := search[index].coord[0], search[index].coord[1]
				switch s {
				case 0:
					first[1] += shift
					second[1] = first[1] + len(word) - 1
				case 1:
					first[1] -= shift
					second[1] = first[1] - len(word) + 1
				case 2:
					first[0] += shift
					second[0] = first[0] + len(word) - 1
				case 3:
					first[0] -= shift
					second[0] = first[0] - len(word) + 1
				case 4:
					first[0] += shift
					first[1] += shift
					second[0] = first[0] + len(word) - 1
					second[1] = first[1] + len(word) - 1
				case 5:
					first[0] -= shift
					first[1] -= shift
					second[0] = first[0] - len(word) + 1
					second[1] = first[1] - len(word) + 1
				case 6:
					first[0] -= shift
					first[1] += shift
					second[0] = first[0] - len(word) + 1
					second[1] = first[1] + len(word) - 1
				case 7:
					first[0] += shift
					first[1] -= shift
					second[0] = first[0] + len(word) - 1
					second[1] = first[1] - len(word) + 1
				}
				coords[word] = [2][2]int{first, second}
				found = true
				break
			}
		}
		if !found {
			return nil, errors.New("could not find word: " + word)
		}
	}
	return coords, nil
}

// Uses strings.Contains to check if word is contained in any of the words
func findwordinslice(word string, search []wordmap) (int, int) {
	for i, w := range search {
		if idx := strings.Index(w.word.String(), word); idx != -1 {
			return i, idx
		}
	}
	return -1, -1
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}