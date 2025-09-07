def find_anagrams(word, candidates):
    word_lower = word.lower()
    word_sorted = sorted(word_lower)
    
    return [candidate for candidate in candidates 
            if len(candidate) == len(word_lower) 
            and candidate.lower() != word_lower 
            and sorted(candidate.lower()) == word_sorted]