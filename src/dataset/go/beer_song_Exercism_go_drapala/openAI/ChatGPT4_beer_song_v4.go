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
	if start <= stop {
		return "", errors.New("start less than stop")
	}

	var builder strings.Builder
	for n := start; n >= stop; n-- {
		verse, err := Verse(n)
		if err != nil {
			return "", err
		}
		builder.WriteString(verse)
		builder.WriteByte('\n')
	}
	return builder.String(), nil
}

func nBottles(n int) string {
	bottle := "bottles"
	if n == 1 {
		bottle = "bottle"
	}
	return fmt.Sprintf("%d %s of beer on the wall, %d %s of beer.\n", n, bottle, n, bottle)
}

func nTakedown(n int) string {
	bottle := "bottles"
	if n == 2 {
		bottle = "bottle"
	}
	oneOrIt := "one"
	if n == 1 {
		oneOrIt = "it"
	}
	numLeft := "no more"
	if n > 1 {
		numLeft = fmt.Sprintf("%d", n-1)
	}
	return fmt.Sprintf("Take %s down and pass it around, %s %s of beer on the wall.\n", oneOrIt, numLeft, bottle)
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