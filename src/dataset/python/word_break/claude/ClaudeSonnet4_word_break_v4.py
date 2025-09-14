import math

def word_break(sentence, words):
    n = len(sentence)
    if not n or not words:
        return None

    word_set = set(words)
    max_word_len = max(len(word) for word in words)
    
    dp = [math.inf] * (n + 1)
    dp[0] = 0
    parent = [-1] * (n + 1)
    
    for i in range(1, n + 1):
        start = max(0, i - max_word_len)
        for j in range(start, i):
            if dp[j] != math.inf:
                word = sentence[j:i]
                if word in word_set and dp[j] + 1 < dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
    
    if dp[n] == math.inf:
        return None
    
    result = []
    i = n
    while i > 0:
        j = parent[i]
        result.append(sentence[j:i])
        i = j
    
    result.reverse()
    return result


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