def length_of_longest_substring(s):
    if not s:
        return 0
    
    char_index = {}
    max_length = 0
    left = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        current_length = right - left + 1
        if current_length > max_length:
            max_length = current_length
    
    return max_length