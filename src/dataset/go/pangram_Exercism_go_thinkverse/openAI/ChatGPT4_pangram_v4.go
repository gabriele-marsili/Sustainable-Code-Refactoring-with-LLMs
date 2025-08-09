package pangram

func IsPangram(input string) bool {
	var mask uint32
	for i := 0; i < len(input); i++ {
		c := input[i]
		if c >= 'A' && c <= 'Z' {
			c += 'a' - 'A'
		}
		if c >= 'a' && c <= 'z' {
			mask |= 1 << (c - 'a')
			if mask == (1<<26)-1 {
				return true
			}
		}
	}
	return mask == (1<<26)-1
}