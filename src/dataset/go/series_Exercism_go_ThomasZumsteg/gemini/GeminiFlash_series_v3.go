package slice

/*All creates all substrings of a given length*/
func All(n int, s string) []string {
	if n <= 0 || len(s) < n {
		return []string{}
	}

	slices := make([]string, 0, len(s)-n+1)
	for i := 0; i <= len(s)-n; i++ {
		slices = append(slices, s[i:i+n])
	}
	return slices
}

/*Frist [sic] generates the first substring of a certain length*/
func Frist(n int, s string) string {
	if len(s) < n || n <= 0 {
		return ""
	}
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