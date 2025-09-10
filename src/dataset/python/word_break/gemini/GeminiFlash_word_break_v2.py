'''
Word Break (Find the original words)

Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list.
If there is more than one possible reconstruction, return solution with less words.
If there is no possible reconstruction, then return null.

Input: sentence = 'thequickbrownfox', words = ['quick', 'brown', 'the', 'fox']
Output: ['the', 'quick', 'brown', 'fox']

Input: sentence = 'bedbathandbeyond', words = ['bed', 'bath', 'bedbath', 'and', 'beyond']
Output: ['bedbath', 'and', 'beyond'] (['bed', 'bath', 'and', 'beyond] has more words)

=========================================
Optimized dynamic programming solution (more simpler solutions can be found here https://www.geeksforgeeks.org/word-break-problem-dp-32/)
    Time Complexity:    O(N*M)  , N = number of chars in the sentence, M = max word length
    Space Complexity:   O(N+W)  , W = number of words
Bonus solution: Backtracking, iterate the sentence construct a substring and check if that substring exist in the set of words.
If the end is reached but the last word doesn't exist in the words, go back 1 word from the result (backtracking).
* But this solution doesn't give the result with the smallest number of words (gives the first found result)
    Time Complexity:    O(?)    , (worst case, about O(W! * N), for example sentence='aaaaaac', words=['a','aa','aaa','aaaa','aaaaa', 'aaaaaa'])
    Space Complexity:   O(W)
'''


############
# Solution #
############

import math

def word_break(sentence, words):
    n = len(sentence)
    word_set = set(words)
    max_word_len = max((len(word) for word in words), default=0)

    dp = [False] * (n + 1)
    dp[0] = True

    for i in range(1, n + 1):
        for j in range(max(0, i - max_word_len), i):
            if dp[j] and sentence[j:i] in word_set:
                dp[i] = True
                break

    if not dp[n]:
        return None

    result = []
    i = n
    while i > 0:
        for j in range(max(0, i - max_word_len), i):
            if dp[j] and sentence[j:i] in word_set:
                result.insert(0, sentence[j:i])
                i = j
                break

    return result


#########################
# Solution Backtracking #
#########################

from collections import deque

def word_break_backtracking(sentence, words):
    all_words = set(words)
    n = len(sentence)
    result = deque()
    
    def backtrack(start_index):
        if start_index == n:
            return True

        for i in range(start_index + 1, n + 1):
            word = sentence[start_index:i]
            if word in all_words:
                result.append(word)
                if backtrack(i):
                    return True
                result.pop()  # Backtrack: remove the last added word
        return False

    if backtrack(0):
        return list(result)
    else:
        return None