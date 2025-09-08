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
	var sb strings.Builder
	for i := 99; i >= 1; i-- {
		verse, _ := Verse(i)
		sb.WriteString(verse)
		if i > 1 {
			sb.WriteString("\n")
		}
	}
	return sb.String()
}

func Verses(start, stop int) (string, error) {
	if start < stop {
		return "", errors.New("start less than stop")
	}

	var sb strings.Builder
	for i := start; i >= stop; i-- {
		verse, err := Verse(i)
		if err != nil {
			return "", err
		}
		sb.WriteString(verse)
		if i > stop {
			sb.WriteString("\n")
		}
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
	default:
		if n >= 3 && n <= 99 {
			verse := fmt.Sprintf("%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n", n, n, n-1)
			return verse, nil
		}
		return "", errors.New("n out of bounds")
	}
}