package pangram

func IsPangram(input string) bool {
	seen := uint32(0)
	
	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			seen |= 1 << (r - 'A')
		} else if r >= 'a' && r <= 'z' {
			seen |= 1 << (r - 'a')
		}
	}
	
	return seen == 0x3FFFFFF
}