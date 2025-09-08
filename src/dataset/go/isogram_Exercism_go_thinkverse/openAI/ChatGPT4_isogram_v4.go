package isogram

func IsIsogram(word string) bool {
	var mask uint32

	for _, char := range word {
		if char >= 'A' && char <= 'Z' {
			char += 'a' - 'A'
		}

		if char >= 'a' && char <= 'z' {
			bit := uint32(1) << (char - 'a')
			if mask&bit != 0 {
				return false
			}
			mask |= bit
		}
	}

	return true
}