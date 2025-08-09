package pangram

// Optimized algorithm using bit fields.
// Thank you for the inspiration @bobahop
//
// https://exercism.org/profiles/bobahop/
func IsPangram(input string) bool {
	var mask uint32
	const targetMask uint32 = (1 << 26) - 1

	for _, char := range []byte(input) {
		if char >= 'A' && char <= 'Z' {
			mask |= 1 << (char - 'A')
		} else if char >= 'a' && char <= 'z' {
			mask |= 1 << (char - 'a')
		}
		
		if mask == targetMask {
			return true
		}
	}

	return mask == targetMask
}