package reverse

func String(s string) string {
	if len(s) <= 1 {
		return s
	}
	
	runes := make([]rune, 0, len(s))
	for len(s) > 0 {
		r, size := utf8.DecodeLastRuneInString(s)
		runes = append(runes, r)
		s = s[:len(s)-size]
	}
	
	return string(runes)
}