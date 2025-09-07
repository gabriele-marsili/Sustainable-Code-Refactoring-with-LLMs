package proverb

func ProverbMaker(first, second string) string {
	if second == "" {
		return "And all for the want of a " + first + "."
	}
	return "For want of a " + first + " the " + second + " was lost."
}

func Proverb(rhyme []string) []string {
	if len(rhyme) == 0 {
		return []string{}
	}
	
	if len(rhyme) == 1 {
		return []string{ProverbMaker(rhyme[0], "")}
	}
	
	proverb := make([]string, 0, len(rhyme))
	
	for i := 0; i < len(rhyme)-1; i++ {
		proverb = append(proverb, ProverbMaker(rhyme[i], rhyme[i+1]))
	}
	proverb = append(proverb, ProverbMaker(rhyme[0], ""))
	
	return proverb
}