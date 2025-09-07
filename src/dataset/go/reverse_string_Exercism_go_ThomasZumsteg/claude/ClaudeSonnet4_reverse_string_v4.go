package reverse

func String(s string) string {
	if len(s) <= 1 {
		return s
	}
	
	runes := make([]rune, len(s))
	i := 0
	for _, r := range s {
		runes[i] = r
		i++
	}
	
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	
	return string(runes)
}