package proverb

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return nil
	}

	result := make([]string, n)
	for i := 0; i < n-1; i++ {
		result[i] = "For want of a " + rhyme[i] + " the " + rhyme[i+1] + " was lost."
	}
	result[n-1] = "And all for the want of a " + rhyme[0] + "."
	return result
}