package slice

/*All creates all substrings of a given length*/
func All(n int, s string) []string {
	if n <= 0 || n > len(s) {
		return []string{}
	}
	slices := make([]string, len(s)-n+1)
	for i := 0; i <= len(s)-n; i++ {
		slices[i] = s[i : i+n]
	}
	return slices
}

/*First generates the first substring of a certain length
handles cases when the substring is not possible*/
func First(n int, s string) (string, bool) {
	if n <= 0 || n > len(s) {
		return "", false
	}
	return s[:n], true
}