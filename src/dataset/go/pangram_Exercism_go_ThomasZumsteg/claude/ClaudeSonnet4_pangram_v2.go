package pangram

func IsPangram(s string) bool {
    seen := [26]bool{}
    count := 0
    
    for _, char := range s {
        if char >= 'A' && char <= 'Z' {
            idx := char - 'A'
            if !seen[idx] {
                seen[idx] = true
                count++
                if count == 26 {
                    return true
                }
            }
        } else if char >= 'a' && char <= 'z' {
            idx := char - 'a'
            if !seen[idx] {
                seen[idx] = true
                count++
                if count == 26 {
                    return true
                }
            }
        }
    }
    
    return count == 26
}