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

def word_break(sentence, words):
    n = len(sentence)
    if n == 0 or not words:
        return None

    word_set = set(words)
    max_word_len = max(len(word) for word in words)
    
    # dp[i] = minimum number of words to form sentence[:i]
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    parent = [-1] * (n + 1)  # Store which word was used to reach position i
    
    for i in range(1, n + 1):
        # Only check substrings up to max_word_len
        start = max(0, i - max_word_len)
        for j in range(start, i):
            if dp[j] != float('inf'):
                word = sentence[j:i]
                if word in word_set and dp[j] + 1 < dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j

    if dp[n] == float('inf'):
        return None

    # Reconstruct the result
    result = []
    i = n
    while i > 0:
        j = parent[i]
        result.append(sentence[j:i])
        i = j
    
    return result[::-1]


#########################
# Solution Backtracking #
#########################

def word_break_backtracking(sentence, words):
    if not sentence or not words:
        return None
        
    word_set = set(words)
    n = len(sentence)
    
    def backtrack(start, path):
        if start == n:
            return path[:]
        
        for end in range(start + 1, n + 1):
            word = sentence[start:end]
            if word in word_set:
                path.append(word)
                result = backtrack(end, path)
                if result is not None:
                    return result
                path.pop()
        
        return None
    
    return backtrack(0, [])