package beer

import (
	"errors"
	"fmt"
	"strings"
)

func Song() string {
	var sb strings.Builder
	for i := 99; i >= 0; i-- {
		verse, _ := Verse(i)
		sb.WriteString(verse)
		if i > 0 {
			sb.WriteString("\n")
		}
	}
	return sb.String()
}

func Verses(start, stop int) (string, error) {
	if start <= stop {
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
		return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n", nil
	case 1:
		return "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n", nil
	default:
		if n >= 2 && n <= 99 {
			bottles := fmt.Sprintf("%d bottles of beer on the wall, %d bottles of beer.\n", n, n)
			takedown := fmt.Sprintf("Take one down and pass it around, %d bottles of beer on the wall.\n", n-1)
			return bottles + takedown, nil
		}
		return "", errors.New("n out of bounds")
	}
}