package proverb

import (
	"fmt"
)

func ProverbMaker(first, second string) string {
	if second == "" {
		return "And all for the want of a " + first + "."
	}
	return "For want of a " + first + " the " + second + " was lost."
}

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return nil
	}

	proverb := make([]string, n)
	for i := 0; i < n-1; i++ {
		proverb[i] = ProverbMaker(rhyme[i], rhyme[i+1])
	}
	proverb[n-1] = ProverbMaker(rhyme[0], "")
	return proverb
}