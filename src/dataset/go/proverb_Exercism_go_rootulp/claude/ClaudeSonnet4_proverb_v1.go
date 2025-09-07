package proverb

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return []string{}
	}
	if n == 1 {
		return []string{"And all for the want of a " + rhyme[0] + "."}
	}
	
	result := make([]string, n)
	for i := 0; i < n-1; i++ {
		result[i] = "For want of a " + rhyme[i] + " the " + rhyme[i+1] + " was lost."
	}
	result[n-1] = "And all for the want of a " + rhyme[0] + "."
	
	return result
}

func multilineProverb(rhyme []string) (result []string) {
	n := len(rhyme)
	result = make([]string, n)
	for i := 0; i < n-1; i++ {
		result[i] = verse(rhyme[i], rhyme[i+1])
	}
	result[n-1] = footer(rhyme[0])
	return result
}

func verse(itemA string, itemB string) string {
	return "For want of a " + itemA + " the " + itemB + " was lost."
}

func footer(item string) string {
	return "And all for the want of a " + item + "."
}