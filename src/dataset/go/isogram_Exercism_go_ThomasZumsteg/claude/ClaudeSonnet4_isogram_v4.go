package isogram

func IsIsogram(s string) bool {
	var seen uint32
	for _, char := range s {
		if char >= 'A' && char <= 'Z' {
			char += 32
		}
		if char >= 'a' && char <= 'z' {
			bit := uint32(1) << (char - 'a')
			if seen&bit != 0 {
				return false
			}
			seen |= bit
		}
	}
	return true
}