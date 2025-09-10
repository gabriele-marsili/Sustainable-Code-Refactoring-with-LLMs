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

def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    res = []

    if n < w:
        return res

    word_counts = {}
    for char in word:
        word_counts[char] = word_counts.get(char, 0) + 1

    window_counts = {}
    for i in range(w):
        window_counts[s[i]] = window_counts.get(s[i], 0) + 1

    if window_counts == word_counts:
        res.append(0)

    for i in range(w, n):
        # Remove the leftmost character from the window
        left_char = s[i - w]
        window_counts[left_char] -= 1
        if window_counts[left_char] == 0:
            del window_counts[left_char]

        # Add the rightmost character to the window
        right_char = s[i]
        window_counts[right_char] = window_counts.get(right_char, 0) + 1

        if window_counts == word_counts:
            res.append(i - w + 1)

    return res