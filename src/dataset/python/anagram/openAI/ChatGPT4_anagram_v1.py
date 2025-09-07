def find_anagrams(word, candidates):
    from collections import Counter
    word_lower = word.lower()
    word_counter = Counter(word_lower)
    return [
        w for w in candidates
        if w.lower() != word_lower and Counter(w.lower()) == word_counter
    ]