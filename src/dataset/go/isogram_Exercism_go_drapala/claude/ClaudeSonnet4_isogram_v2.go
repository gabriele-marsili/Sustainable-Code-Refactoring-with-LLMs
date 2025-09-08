package isogram

func IsIsogram(word string) bool {
    seen := uint32(0)
    
    for i := 0; i < len(word); i++ {
        char := word[i]
        
        // Convert to lowercase if uppercase
        if char >= 'A' && char <= 'Z' {
            char += 32
        }
        
        // Check if character is a lowercase letter
        if char >= 'a' && char <= 'z' {
            bit := uint32(1) << (char - 'a')
            
            // If bit is already set, character was seen before
            if seen&bit != 0 {
                return false
            }
            
            // Set the bit for this character
            seen |= bit
        }
    }
    
    return true
}