def longest_palindromic_substring(s):
    if not s:
        return 0
    
    n = len(s)
    if n == 1:
        return 1
    
    longest = 1
    
    for i in range(n):
        odd_length = expand_around_center(s, i, i, n)
        even_length = expand_around_center(s, i, i + 1, n)
        
        current_max = max(odd_length, even_length)
        if current_max > longest:
            longest = current_max
            
        if longest >= n - i:
            break
    
    return longest

def compare_both_sides(s, count, left, right):
    n = len(s)
    
    while left >= 0 and right < n and s[left] == s[right]:
        count += 2
        left -= 1
        right += 1
    
    return count

def expand_around_center(s, left, right, n):
    while left >= 0 and right < n and s[left] == s[right]:
        left -= 1
        right += 1
    
    return right - left - 1