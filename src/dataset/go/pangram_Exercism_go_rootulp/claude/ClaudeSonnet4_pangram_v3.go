package pangram

func IsPangram(input string) bool {
	seen := make([]bool, 26)
	count := 0
	
	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			r += 32
		}
		if r >= 'a' && r <= 'z' {
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