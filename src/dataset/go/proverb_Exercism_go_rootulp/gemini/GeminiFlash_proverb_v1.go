package proverb

import "fmt"

func Proverb(rhyme []string) []string {
	lenRhyme := len(rhyme)
	if lenRhyme == 0 {
		return []string{}
	}

	result := make([]string, 0, lenRhyme) // Pre-allocate memory

	if lenRhyme == 1 {
		result = append(result, fmt.Sprintf("And all for the want of a %s.", rhyme[0]))
		return result
	}

	for i := 0; i < lenRhyme-1; i++ {
		result = append(result, fmt.Sprintf("For want of a %s the %s was lost.", rhyme[i], rhyme[i+1]))
	}

	result = append(result, fmt.Sprintf("And all for the want of a %s.", rhyme[0]))

	return result
}