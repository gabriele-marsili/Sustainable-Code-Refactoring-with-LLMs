def find_anagrams(word, candidates):
    analist = []
    word_lower = word.lower()
    word_sorted = sorted(word_lower)
    
    for w in candidates:
        w_lower = w.lower()
        if len(w_lower) == len(word_lower) and w_lower != word_lower and sorted(w_lower) == word_sorted:
            analist.append(w)
    return analist