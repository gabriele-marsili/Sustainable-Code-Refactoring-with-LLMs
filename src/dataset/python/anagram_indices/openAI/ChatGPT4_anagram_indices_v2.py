from collections import Counter

def anagram_indices(s, word):
    n, w = len(s), len(word)
    if n < w:
        return []

    word_count = Counter(word)
    window_count = Counter(s[:w])
    res = []

    if word_count == window_count:
        res.append(0)

    for i in range(w, n):
        window_count[s[i]] += 1
        window_count[s[i - w]] -= 1

        if window_count[s[i - w]] == 0:
            del window_count[s[i - w]]

        if word_count == window_count:
            res.append(i - w + 1)

    return res