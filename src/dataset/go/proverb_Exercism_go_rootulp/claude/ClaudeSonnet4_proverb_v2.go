package proverb

import "strings"

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return []string{}
	}
	if n == 1 {
		return []string{footer(rhyme[0])}
	}
	
	result := make([]string, n)
	for i := 0; i < n-1; i++ {
		result[i] = verse(rhyme[i], rhyme[i+1])
	}
	result[n-1] = footer(rhyme[0])
	return result
}

func verse(itemA, itemB string) string {
	var b strings.Builder
	b.Grow(len(itemA) + len(itemB) + 32)
	b.WriteString("For want of a ")
	b.WriteString(itemA)
	b.WriteString(" the ")
	b.WriteString(itemB)
	b.WriteString(" was lost.")
	return b.String()
}

func footer(item string) string {
	var b strings.Builder
	b.Grow(len(item) + 26)
	b.WriteString("And all for the want of a ")
	b.WriteString(item)
	b.WriteByte('.')
	return b.String()
}