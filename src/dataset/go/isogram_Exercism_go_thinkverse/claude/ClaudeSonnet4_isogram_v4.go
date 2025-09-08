package isogram

func IsIsogram(word string) bool {
	var mask uint32

	for _, r := range word {
		if r >= 'A' && r <= 'Z' {
			r += 32
		}
		
		if r >= 'a' && r <= 'z' {
			bit := uint32(1) << (r - 'a')
			if mask&bit != 0 {
				return false
			}
			mask |= bit
		}
	}

	return true
}