from collections import Counter

def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    res = []

    if n < w:
        return res

    word_count = Counter(word)
    window_count = Counter(s[:w])

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