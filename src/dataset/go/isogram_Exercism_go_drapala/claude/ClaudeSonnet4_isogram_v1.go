package isogram

func IsIsogram(word string) bool {
    var seen uint32
    
    for _, char := range word {
        if char >= 'A' && char <= 'Z' {
            char += 32 // Convert to lowercase
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