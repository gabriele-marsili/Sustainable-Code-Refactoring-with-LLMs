def find_anagrams(word, candidates):
    analist = []
    def compatible(w1, w2):
        if len(w1) == len(w2) and w1 != w2:
            return all([l for l in w1].count(m) == [n for n in w2].count(m) for m in w1)
    for w in candidates:
        if compatible(word.lower(), w.lower()):
            analist.append(w)
    return analist
