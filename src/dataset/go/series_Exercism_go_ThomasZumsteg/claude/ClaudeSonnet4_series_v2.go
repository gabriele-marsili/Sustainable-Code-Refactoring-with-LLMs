package slice

/*All creates all substrings of a given length*/
func All(n int, s string) []string {
	if n <= 0 || n > len(s) {
		return []string{}
	}
	
	sliceCount := len(s) - n + 1
	slices := make([]string, 0, sliceCount)
	
	for i := 0; i <= len(s)-n; i++ {
		slices = append(slices, s[i:i+n])
	}
	return slices
}

/*Frist generates the first substring of a certain length*/
func Frist(n int, s string) string {
	return s[:n]
}

/*First generates the first substring of a certain length
handels cases when the substring is not possible*/
func First(n int, s string) (string, bool) {
	if len(s) < n || n <= 0 {
		return "", false
	}
	return s[:n], true
}