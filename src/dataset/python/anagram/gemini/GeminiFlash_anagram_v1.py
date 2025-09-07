def find_anagrams(word, candidates):
    word_lower = word.lower()
    word_counts = {}
    for char in word_lower:
        word_counts[char] = word_counts.get(char, 0) + 1

    anagrams = []
    for candidate in candidates:
        candidate_lower = candidate.lower()
        if len(word_lower) != len(candidate_lower) or word_lower == candidate_lower:
            continue

        candidate_counts = {}
        for char in candidate_lower:
            candidate_counts[char] = candidate_counts.get(char, 0) + 1

        if candidate_counts == word_counts:
            anagrams.append(candidate)

    return anagrams