package proverb

import "fmt"

func Proverb(rhyme []string) []string {
	if len(rhyme) == 0 {
		return nil
	}

	result := make([]string, len(rhyme))
	for i := 0; i+1 < len(rhyme); i++ {
		result[i] = fmt.Sprintf("For want of a %s the %s was lost.", rhyme[i], rhyme[i+1])
	}
	result[len(rhyme)-1] = fmt.Sprintf("And all for the want of a %s.", rhyme[0])
	return result
}