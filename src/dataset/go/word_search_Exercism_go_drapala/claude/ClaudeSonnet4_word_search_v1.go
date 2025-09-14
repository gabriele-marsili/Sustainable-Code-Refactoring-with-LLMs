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
	word  string
	coord [2][2]int
}

// top -> bottom
func (b *board) top2bottom() []wordmap {
	wm := make([]wordmap, b.cols)
	for c := 0; c < b.cols; c++ {
		var sb strings.Builder
		sb.Grow(b.rows)
		for r := 0; r < b.rows; r++ {
			sb.WriteByte(b.words[r][c])
		}
		wm[c].word = sb.String()
		wm[c].coord[0] = [2]int{c, 0}
		wm[c].coord[1] = [2]int{c, b.rows - 1}
	}
	return wm
}

// bottom -> top
func (b *board) bottom2top() []wordmap {
	wm := make([]wordmap, b.cols)
	for c := 0; c < b.cols; c++ {
		var sb strings.Builder
		sb.Grow(b.rows)
		for r := b.rows - 1; r >= 0; r-- {
			sb.WriteByte(b.words[r][c])
		}
		wm[c].word = sb.String()
		wm[c].coord[0] = [2]int{c, b.rows - 1}
		wm[c].coord[1] = [2]int{c, 0}
	}
	return wm
}

// left -> right
func (b *board) left2right() []wordmap {
	wm := make([]wordmap, b.rows)
	for r := 0; r < b.rows; r++ {
		wm[r].word = b.words[r]
		wm[r].coord[0] = [2]int{0, r}
		wm[r].coord[1] = [2]int{b.cols - 1, r}
	}
	return wm
}

// right -> left
func (b *board) right2left() []wordmap {
	wm := make([]wordmap, b.rows)
	for r := 0; r < b.rows; r++ {
		var sb strings.Builder
		sb.Grow(b.cols)
		for c := b.cols - 1; c >= 0; c-- {
			sb.WriteByte(b.words[r][c])
		}
		wm[r].word = sb.String()
		wm[r].coord[0] = [2]int{b.cols - 1, r}
		wm[r].coord[1] = [2]int{0, r}
	}
	return wm
}

// top-left -> bottom-right
func (b *board) topleft2bottomright() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	
	// Sweep right across columns
	for c := 0; c < b.cols; c++ {
		loop_topleft2bottomright(0, c, b, wm, &i)
	}
	// Sweep down across rows
	for r := 1; r < b.rows; r++ {
		loop_topleft2bottomright(r, 0, b, wm, &i)
	}
	return wm
}

// bottom-right -> top-left
func (b *board) bottomright2topleft() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	
	// Sweep left across columns
	for c := b.cols - 1; c >= 0; c-- {
		loop_bottomright2topleft(b.rows-1, c, b, wm, &i)
	}
	// Sweep up across rows
	for r := b.rows - 2; r >= 0; r-- {
		loop_bottomright2topleft(r, b.cols-1, b, wm, &i)
	}
	return wm
}

// top-right -> bottom-left
func (b *board) topright2bottomleft() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	
	// Sweep left across columns
	for c := b.cols - 1; c >= 0; c-- {
		loop_topright2bottomleft(0, c, b, wm, &i)
	}
	// Sweep down across rows
	for r := 1; r < b.rows; r++ {
		loop_topright2bottomleft(r, b.cols-1, b, wm, &i)
	}
	return wm
}

// bottom-left -> top-right
func (b *board) bottomleft2topright() []wordmap {
	wm := make([]wordmap, b.cols+b.rows-1)
	i := 0
	
	// Sweep right across columns
	for c := 0; c < b.cols; c++ {
		loop_bottomleft2topright(b.rows-1, c, b, wm, &i)
	}
	// Sweep up across rows
	for r := b.rows - 2; r >= 0; r-- {
		loop_bottomleft2topright(r, 0, b, wm, &i)
	}
	return wm
}

// Helpers
func loop_topleft2bottomright(r, c int, b *board, wm []wordmap, i *int) {
	var sb strings.Builder
	diag_r, diag_c := r, c
	startR, startC := r, c
	
	for diag_r < b.rows && diag_c < b.cols {
		sb.WriteByte(b.words[diag_r][diag_c])
		diag_r++
		diag_c++
	}
	
	wm[*i].word = sb.String()
	wm[*i].coord[0] = [2]int{startC, startR}
	wm[*i].coord[1] = [2]int{diag_c - 1, diag_r - 1}
	*i++
}

func loop_bottomright2topleft(r, c int, b *board, wm []wordmap, i *int) {
	var sb strings.Builder
	diag_r, diag_c := r, c
	startR, startC := r, c
	
	for diag_r >= 0 && diag_c >= 0 {
		sb.WriteByte(b.words[diag_r][diag_c])
		diag_r--
		diag_c--
	}
	
	wm[*i].word = sb.String()
	wm[*i].coord[0] = [2]int{startC, startR}
	wm[*i].coord[1] = [2]int{diag_c + 1, diag_r + 1}
	*i++
}

func loop_topright2bottomleft(r, c int, b *board, wm []wordmap, i *int) {
	var sb strings.Builder
	diag_r, diag_c := r, c
	startR, startC := r, c
	
	for diag_r < b.rows && diag_c >= 0 {
		sb.WriteByte(b.words[diag_r][diag_c])
		diag_r++
		diag_c--
	}
	
	wm[*i].word = sb.String()
	wm[*i].coord[0] = [2]int{startC, startR}
	wm[*i].coord[1] = [2]int{diag_c + 1, diag_r - 1}
	*i++
}

func loop_bottomleft2topright(r, c int, b *board, wm []wordmap, i *int) {
	var sb strings.Builder
	diag_r, diag_c := r, c
	startR, startC := r, c
	
	for diag_r >= 0 && diag_c < b.cols {
		sb.WriteByte(b.words[diag_r][diag_c])
		diag_r--
		diag_c++
	}
	
	wm[*i].word = sb.String()
	wm[*i].coord[0] = [2]int{startC, startR}
	wm[*i].coord[1] = [2]int{diag_c - 1, diag_r + 1}
	*i++
}

// Main function
func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	if len(puzzle) == 0 || len(puzzle[0]) == 0 {
		return nil, errors.New("puzzle is empty")
	}
	
	b := board{
		rows:  len(puzzle),
		cols:  len(puzzle[0]),
		words: puzzle,
	}

	// Error handling
	for r := range puzzle {
		if len(puzzle[r]) != b.cols {
			return nil, errors.New("puzzle is not rectangular")
		}
	}

	searchlist := [][]wordmap{
		b.top2bottom(), 
		b.bottom2top(), 
		b.left2right(), 
		b.right2left(), 
		b.topleft2bottomright(), 
		b.bottomright2topleft(), 
		b.topright2bottomleft(), 
		b.bottomleft2topright(),
	}

	coords := make(map[string][2][2]int, len(words))

	// Identify hits
	for _, word := range words {
		found := false
		for s, search := range searchlist {
			index, shift := findwordinslice(word, search)
			if index != -1 {
				first := search[index].coord[0]
				second := search[index].coord[1]

				// Add to coords
				switch s {
				case 0: // Top 2 bottom
					first[1] = first[1] + shift
					second[1] = first[1] + (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 1: // Bottom 2 top
					first[1] = first[1] - shift
					second[1] = first[1] - (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 2: // Left 2 right
					first[0] = first[0] + shift
					second[0] = first[0] + (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 3: // Right 2 left
					first[0] = first[0] - shift
					second[0] = first[0] - (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 4: // Top Left 2 Bottom Right
					first[0] = first[0] + shift
					first[1] = first[1] + shift
					second[0] = first[0] + (len(word) - 1)
					second[1] = first[1] + (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 5: // Bottom Right 2 Top Left
					first[0] = first[0] - shift
					first[1] = first[1] - shift
					second[0] = first[0] - (len(word) - 1)
					second[1] = first[1] - (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 6: // Top Right 2 Bottom Left
					first[0] = first[0] - shift
					first[1] = first[1] + shift
					second[0] = first[0] - (len(word) - 1)
					second[1] = first[1] + (len(word) - 1)
					coords[word] = [2][2]int{first, second}

				case 7: // Bottom Left 2 Top Right
					first[0] = first[0] + shift
					first[1] = first[1] - shift
					second[0] = first[0] + (len(word) - 1)
					second[1] = first[1] - (len(word) - 1)
					coords[word] = [2][2]int{first, second}
				}

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

// Uses Regex to check if word is contained in any of the words
func findwordinslice(word string, search []wordmap) (int, int) {
	for i, w := range search {
		if idx := strings.Index(w.word, word); idx != -1 {
			return i, idx
		}
	}
	return -1, -1
}