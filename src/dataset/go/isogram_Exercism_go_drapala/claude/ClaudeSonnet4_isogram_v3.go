package isogram

import (
    "strings"
)

func IsIsogram(word string) bool {
    word = strings.ToLower(word)
    
    seen := uint32(0)
    
    for _, char := range word {
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