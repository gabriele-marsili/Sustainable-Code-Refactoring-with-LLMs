package proverb

func Proverb(rhyme []string) []string {
	if len(rhyme) == 0 {
		return nil
	}

	result := make([]string, len(rhyme))
	for i := 0; i+1 < len(rhyme); i++ {
		result[i] = "For want of a " + rhyme[i] + " the " + rhyme[i+1] + " was lost."
	}
	result[len(rhyme)-1] = "And all for the want of a " + rhyme[0] + "."
	return result
}