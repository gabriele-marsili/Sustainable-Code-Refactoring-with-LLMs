package pangram

func IsPangram(s string) bool {
    seen := uint32(0)
    const allLetters = uint32(0x3FFFFFF)
    
    for i := 0; i < len(s); i++ {
        c := s[i]
        if c >= 'A' && c <= 'Z' {
            seen |= 1 << (c - 'A')
        } else if c >= 'a' && c <= 'z' {
            seen |= 1 << (c - 'a')
        }
        if seen == allLetters {
            return true
        }
    }
    
    return seen == allLetters
}