package proverb

import (
	"fmt"
)

func ProverbMaker(first, second string) string {
	if second == "" {
		return fmt.Sprintf("And all for the want of a %s.", first)
	}
	return fmt.Sprintf("For want of a %s the %s was lost.", first, second)
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