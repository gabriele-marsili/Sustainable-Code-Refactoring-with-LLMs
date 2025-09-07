def count_words(sentence):
    import re
    from collections import Counter
    
    normalized = re.sub(r'[^\w\s\']', ' ', sentence.replace('\n', ' ').replace('\t', ' '))
    words = [word.strip("'") for word in normalized.lower().split() if word.strip("'")]
    
    return dict(Counter(words))