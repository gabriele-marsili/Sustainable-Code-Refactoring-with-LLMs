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
Simple string iteration, use hashset to save unique characters.
If the current character exists in the set then move the left index till the one
    Time Complexity:    O(N)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def length_of_longest_substring(s):
    char_index_map = {}
    max_length = 0
    left = 0
    n = len(s)

    for right in range(n):
        if s[right] in char_index_map and char_index_map[s[right]] >= left:
            left = char_index_map[s[right]] + 1
        char_index_map[s[right]] = right
        max_length = max(max_length, right - left + 1)

    return max_length