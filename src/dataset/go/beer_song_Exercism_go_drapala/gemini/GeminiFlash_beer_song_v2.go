package beer

import (
	"errors"
	"fmt"
	"strings"
)

var (
	verse0 = "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n"
	verse1 = "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n"
	verse2 = "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n"
)

func Song() string {
	verses, _ := Verses(99, 0)
	return verses
}

func Verses(start, stop int) (string, error) {
	if start < stop {
		return "", errors.New("start less than stop")
	}

	var sb strings.Builder
	for n := start; n >= stop; n-- {
		verse, err := Verse(n)
		if err != nil {
			return "", err
		}
		sb.WriteString(verse)
		sb.WriteString("\n")
	}
	return sb.String(), nil
}

func Verse(n int) (string, error) {
	switch n {
	case 0:
		return verse0, nil
	case 1:
		return verse1, nil
	case 2:
		return verse2, nil
	case 3:
		return "3 bottles of beer on the wall, 3 bottles of beer.\nTake one down and pass it around, 2 bottles of beer on the wall.\n", nil
	default:
		if n > 2 && n <= 99 {
			line1 := fmt.Sprintf("%d bottles of beer on the wall, %d bottles of beer.\n", n, n)
			line2 := fmt.Sprintf("Take one down and pass it around, %d bottles of beer on the wall.\n", n-1)
			return line1 + line2, nil
		}
		return "", errors.New("n out of bounds")
	}
}