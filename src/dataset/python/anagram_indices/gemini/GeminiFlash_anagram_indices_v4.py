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

from collections import Counter

def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    res = []

    if n < w:
        return res

    word_counts = Counter(word)

    for i in range(n - w + 1):
        if Counter(s[i:i+w]) == word_counts:
            res.append(i)

    return res