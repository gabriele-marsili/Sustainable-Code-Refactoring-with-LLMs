package pangram

func IsPangram(input string) bool {
	var mask uint32
	const targetMask uint32 = (1 << 26) - 1

	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			mask |= 1 << (r - 'A')
		} else if r >= 'a' && r <= 'z' {
			mask |= 1 << (r - 'a')
		}
		
		if mask == targetMask {
			return true
		}
	}

	return mask == targetMask
}