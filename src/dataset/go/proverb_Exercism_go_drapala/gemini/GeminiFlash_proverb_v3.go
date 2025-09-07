package proverb

import (
	"fmt"
	"strings"
)

func ProverbMaker(first, second string) string {
	if second == "" {
		return fmt.Sprintf("And all for the want of a %s.", first)
	}
	var sb strings.Builder
	sb.WriteString("For want of a ")
	sb.WriteString(first)
	sb.WriteString(" the ")
	sb.WriteString(second)
	sb.WriteString(" was lost.")
	return sb.String()
}

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return []string{}
	}

	proverb := make([]string, 0, n)

	if n == 1 {
		proverb = append(proverb, ProverbMaker(rhyme[0], ""))
		return proverb
	}

	for i := 0; i < n-1; i++ {
		proverb = append(proverb, ProverbMaker(rhyme[i], rhyme[i+1]))
	}
	proverb = append(proverb, ProverbMaker(rhyme[0], ""))
	return proverb
}