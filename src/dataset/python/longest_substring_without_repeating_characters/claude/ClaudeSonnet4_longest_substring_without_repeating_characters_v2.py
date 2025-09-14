'''
Longest Substring Without Repeating Characters

Given a string, find the length of the longest substring without repeating characters.

Input: 'abcabcbb'
Output: 3
Output explanation: The answer is 'abc', with the length of 3.

Input: 'bbbbb'
Output: 1
Output explanation: The answer is 'b', with the length of 1.

=========================================
Optimized sliding window with character index tracking.
Uses dictionary to store last seen index of each character for O(1) jumps.
    Time Complexity:    O(N)
    Space Complexity:   O(min(m,n)) where m is charset size
'''


############
# Solution #
############

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
        max_length = max(max_length, right - left + 1)
    
    return max_length