package reverse

func String(s string) string {
	if len(s) <= 1 {
		return s
	}
	
	runes := []rune(s)
	length := len(runes)
	half := length >> 1
	
	for i := 0; i < half; i++ {
		runes[i], runes[length-1-i] = runes[length-1-i], runes[i]
	}
	
	return string(runes)
}