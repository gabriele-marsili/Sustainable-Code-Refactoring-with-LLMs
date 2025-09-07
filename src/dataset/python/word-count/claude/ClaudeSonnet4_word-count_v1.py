def count_words(sentence):
    import re
    from collections import defaultdict
    
    # Single regex operation to clean and split
    words = re.findall(r"[a-zA-Z0-9']+", sentence.lower())
    
    # Use defaultdict to avoid key existence checks
    wordcount = defaultdict(int)
    
    # Strip apostrophes and count in single pass
    for word in words:
        clean_word = word.strip("'")
        if clean_word:  # Only count non-empty words
            wordcount[clean_word] += 1
    
    return dict(wordcount)