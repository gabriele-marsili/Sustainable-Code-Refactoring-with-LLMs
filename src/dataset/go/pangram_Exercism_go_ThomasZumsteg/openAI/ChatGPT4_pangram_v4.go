package pangram

func IsPangram(s string) bool {
    var seen [26]bool
    count := 0
    for _, r := range s {
        if r >= 'A' && r <= 'Z' {
            r += 'a' - 'A'
        }
        if r >= 'a' && r <= 'z' {
            idx := r - 'a'
            if !seen[idx] {
                seen[idx] = true
                count++
                if count == 26 {
                    return true
                }
            }
        }
    }
    return false
}