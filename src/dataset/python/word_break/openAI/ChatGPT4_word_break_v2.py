import math
from collections import deque

def word_break(sentence, words):
    n = len(sentence)
    if n == 0 or not words:
        return None

    word_set = set(words)
    max_word_len = max(map(len, words))
    dp = [math.inf] * (n + 1)
    dp[0] = 0
    backtrack = [-1] * (n + 1)

    for i in range(1, n + 1):
        for j in range(max(0, i - max_word_len), i):
            if sentence[j:i] in word_set and dp[j] + 1 < dp[i]:
                dp[i] = dp[j] + 1
                backtrack[i] = j

    if dp[n] == math.inf:
        return None

    result = []
    idx = n
    while idx > 0:
        result.append(sentence[backtrack[idx]:idx])
        idx = backtrack[idx]

    return result[::-1]

def word_break_backtracking(sentence, words):
    word_set = set(words)
    n = len(sentence)
    result = deque()
    subsentence = ''
    i = 0

    while i < n or subsentence:
        if i == n:
            if not result:
                return None
            subsentence = result.pop()
            i -= len(subsentence)

        subsentence += sentence[i]
        i += 1

        if subsentence in word_set:
            result.append(subsentence)
            subsentence = ''

    return list(result)