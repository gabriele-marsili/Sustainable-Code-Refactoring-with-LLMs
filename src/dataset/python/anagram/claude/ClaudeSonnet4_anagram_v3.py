def find_anagrams(word, candidates):
    analist = []
    word_lower = word.lower()
    word_sorted = sorted(word_lower)
    
    def compatible(w1_sorted, w2):
        w2_lower = w2.lower()
        return len(w1_sorted) == len(w2_lower) and word_lower != w2_lower and sorted(w2_lower) == w1_sorted
    
    for w in candidates:
        if compatible(word_sorted, w):
            analist.append(w)
    return analist