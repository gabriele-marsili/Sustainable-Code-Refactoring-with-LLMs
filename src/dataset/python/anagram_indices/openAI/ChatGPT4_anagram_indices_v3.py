from collections import Counter

class LettersCounter:
    def __init__(self):
        self.letters = Counter()

    def add_letter(self, letter):
        self.letters[letter] += 1
        if self.letters[letter] == 0:
            del self.letters[letter]

    def remove_letter(self, letter):
        self.letters[letter] -= 1
        if self.letters[letter] == 0:
            del self.letters[letter]

    def is_empty(self):
        return not self.letters


def anagram_indices(s, word):
    n, w = len(s), len(word)
    if n < w:
        return []

    res = []
    counter = Counter(word)
    window = Counter(s[:w])

    if counter == window:
        res.append(0)

    for i in range(w, n):
        window[s[i]] += 1
        window[s[i - w]] -= 1
        if window[s[i - w]] == 0:
            del window[s[i - w]]
        if counter == window:
            res.append(i - w + 1)

    return res