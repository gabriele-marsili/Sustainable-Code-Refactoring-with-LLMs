package pangram

func IsPangram(input string) bool {
	seen := [26]bool{}
	count := 0
	
	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			idx := r - 'A'
			if !seen[idx] {
				seen[idx] = true
				count++
				if count == 26 {
					return true
				}
			}
		} else if r >= 'a' && r <= 'z' {
			idx := r - 'a'
			if !seen[idx] {
				seen[idx] = true
				count++
				if count == 26 {
					return true
				}
			}
		}
	}
	
	return count == 26
}