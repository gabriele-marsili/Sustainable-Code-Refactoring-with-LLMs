'''
Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string ''.

Input: ['flower', 'flow', 'flight']
Output: 'fl'

Input: ['dog', 'racecar', 'car']
Output: ''

Input: ['aa', 'a']
Output: 'a'

=========================================
Many solutions for this problem exist (Divide and Conquer, Trie, etc) but this is the simplest and the fastest one.
Use the first string as LCP and iterate the rest in each step compare it with another one.
    Time Complexity:    O(N*A)  , N = number of strings, A = average chars, or simplest notation O(S) = total number of chars
    Space Complexity:   O(1)
'''


############
# Solution #
############

def longest_common_prefix(strs):
    if not strs:
        return ""

    shortest = min(strs, key=len)
    for i, char in enumerate(shortest):
        for other in strs:
            if other[i] != char:
                return shortest[:i]
    return shortest