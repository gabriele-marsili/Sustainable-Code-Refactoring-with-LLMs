package proverb

func Proverb(rhyme []string) []string {
	n := len(rhyme)
	if n == 0 {
		return []string{}
	}
	
	if n == 1 {
		return []string{"And all for the want of a " + rhyme[0] + "."}
	}
	
	proverb := make([]string, n)
	
	for i := 0; i < n-1; i++ {
		proverb[i] = "For want of a " + rhyme[i] + " the " + rhyme[i+1] + " was lost."
	}
	proverb[n-1] = "And all for the want of a " + rhyme[0] + "."
	
	return proverb
}