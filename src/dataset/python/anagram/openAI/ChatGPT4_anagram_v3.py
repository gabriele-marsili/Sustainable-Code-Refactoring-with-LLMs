from collections import Counter

def find_anagrams(word, candidates):
    word_counter = Counter(word.lower())
    return [w for w in candidates if len(w) == len(word) and w.lower() != word.lower() and Counter(w.lower()) == word_counter]