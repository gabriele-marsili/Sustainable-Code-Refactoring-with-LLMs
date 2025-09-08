package beer

import (
	"errors"
	"fmt"
	"strings"
)

func Song() string {
	verses, _ := Verses(99, 0)
	return verses
}

func Verses(start, stop int) (string, error) {
	if start < stop {
		return "", errors.New("start less than stop")
	}

	var builder strings.Builder
	for n := start; n >= stop; n-- {
		verse, err := Verse(n)
		if err != nil {
			return "", err
		}
		builder.WriteString(verse)
		if n != stop {
			builder.WriteString("\n")
		}
	}
	return builder.String(), nil
}

func nBottles(n int) string {
	if n == 1 {
		return "1 bottle of beer on the wall, 1 bottle of beer.\n"
	}
	return fmt.Sprintf("%d bottles of beer on the wall, %d bottles of beer.\n", n, n)
}

func nTakedown(n int) string {
	switch n {
	case 1:
		return "Take it down and pass it around, no more bottles of beer on the wall.\n"
	case 2:
		return "Take one down and pass it around, 1 bottle of beer on the wall.\n"
	default:
		return fmt.Sprintf("Take one down and pass it around, %d bottles of beer on the wall.\n", n-1)
	}
}

func Verse(n int) (string, error) {
	switch {
	case n == 0:
		return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n", nil
	case n >= 1 && n <= 99:
		return nBottles(n) + nTakedown(n), nil
	default:
		return "", errors.New("n out of bounds")
	}
}