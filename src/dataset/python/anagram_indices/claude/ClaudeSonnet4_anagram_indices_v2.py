'''
Anagram Indices

Given a word and a string S, find all starting indices in S which are anagrams of word.
(An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once)

Input: s='abxaba' word='ab'
Output: [0, 3, 4]
Output explanation: For example, given that word is 'ab', and S is 'abxaba', return 0 'ab', 3 'ab', and 4'ba'.

=========================================
Create a structure for counting the ferquency of letters (the structure is a simple dictionary).
Similar to sliding window solution, add letters into the structure from the front of sliding window
and remove from the back of sliding window.
    Time Complexity:    O(N)
    Space Complexity:   O(W)    , W = length of Word

Solution 2: this can be solved using Rabin–Karp algorithm (small modification of this algorithm).
But both solutions have same time & space complexity.
'''


############
# Solution #
############

from collections import defaultdict

def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    
    if n < w:
        return []

    # Use defaultdict to avoid key existence checks
    word_count = defaultdict(int)
    window_count = defaultdict(int)
    
    # Count letters in word
    for letter in word:
        word_count[letter] += 1
    
    res = []
    
    # Initialize first window
    for i in range(w):
        window_count[s[i]] += 1
    
    # Check if first window is anagram
    if word_count == window_count:
        res.append(0)
    
    # Slide window
    for i in range(w, n):
        # Add new character
        window_count[s[i]] += 1
        
        # Remove old character
        old_char = s[i - w]
        window_count[old_char] -= 1
        if window_count[old_char] == 0:
            del window_count[old_char]
        
        # Check if current window is anagram
        if word_count == window_count:
            res.append(i - w + 1)
    
    return res