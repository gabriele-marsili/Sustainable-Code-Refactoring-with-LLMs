from collections import defaultdict, Counter

class LettersCounter:
    def __init__(self):
        self.__letters = defaultdict(int)
        self.__size = 0

    def add_letter(self, letter):
        if self.__letters[letter] == 0:
            self.__size += 1
        self.__letters[letter] += 1

    def remove_letter(self, letter):
        self.__letters[letter] -= 1
        if self.__letters[letter] == 0:
            self.__size -= 1

    def is_empty(self):
        return self.__size == 0


def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    
    if n < w:
        return []

    word_count = Counter(word)
    window_count = defaultdict(int)
    matches = 0
    res = []

    for i in range(n):
        right_char = s[i]
        if right_char in word_count:
            window_count[right_char] += 1
            if window_count[right_char] == word_count[right_char]:
                matches += 1

        if i >= w:
            left_char = s[i - w]
            if left_char in word_count:
                if window_count[left_char] == word_count[left_char]:
                    matches -= 1
                window_count[left_char] -= 1

        if matches == len(word_count):
            res.append(i - w + 1)

    return res