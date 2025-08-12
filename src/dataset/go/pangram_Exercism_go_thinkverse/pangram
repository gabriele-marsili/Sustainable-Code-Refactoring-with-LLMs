package pangram

func IsPangram(input string) bool {
	var mask uint32

	for _, char := range input {
		switch {
		case 'A' <= char && char <= 'Z':
			mask |= 1 << (char - 'A')
		case 'a' <= char && char <= 'z':
			mask |= 1 << (char - 'a')
		}
		if mask == (1<<26)-1 {
			return true
		}
	}

	return false
}