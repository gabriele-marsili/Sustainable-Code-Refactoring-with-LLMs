import math
from collections import deque

def word_break(sentence, words):
    if not sentence or not words:
        return None

    n = len(sentence)
    dp = [math.inf] * (n + 1)
    dp[0] = 0
    dw = [-1] * (n + 1)
    matched_indices = [0]

    word_set = set(words)
    max_word_len = max(map(len, words))

    for i in range(1, n + 1):
        for matched_index in reversed(matched_indices):
            if matched_index < i - max_word_len:
                break

            subsentence = sentence[matched_index:i]
            if subsentence in word_set and dp[matched_index] + 1 < dp[i]:
                dp[i] = dp[matched_index] + 1
                dw[i] = matched_index
                matched_indices.append(i)
                break

    if dp[n] == math.inf:
        return None

    result = []
    i = n
    while i > 0:
        start = dw[i]
        result.append(sentence[start:i])
        i = start

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