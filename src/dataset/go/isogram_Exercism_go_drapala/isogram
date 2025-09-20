package isogram

import "unicode"

func IsIsogram(word string) bool {
    seen := make(map[rune]struct{}, 26) // Preallocate map with capacity for 26 letters

    for _, char := range word {
        if unicode.IsLetter(char) {
            char = unicode.ToLower(char)
            if _, exists := seen[char]; exists {
                return false
            }
            seen[char] = struct{}{}
        }
    }

    return true
}