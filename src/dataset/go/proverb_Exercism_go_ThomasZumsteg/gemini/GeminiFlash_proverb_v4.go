package proverb

import "fmt"
import "strings"

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return []string{}
	}

	result := make([]string, 0, n)
	var sb strings.Builder
	for i := 0; i < n-1; i++ {
		sb.WriteString("For want of a ")
		sb.WriteString(rhyme[i])
		sb.WriteString(" the ")
		sb.WriteString(rhyme[i+1])
		sb.WriteString(" was lost.")
		result = append(result, sb.String())
		sb.Reset()
	}

	sb.WriteString("And all for the want of a ")
	sb.WriteString(rhyme[0])
	sb.WriteString(".")
	result = append(result, sb.String())

	return result
}