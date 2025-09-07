def count_words(sentence):
    import re
    from collections import defaultdict
    
    sentence = re.sub(r'[\n\t]+', ' ', sentence)
    sentence = re.sub(r"[^\w'\s]", ' ', sentence)
    words = sentence.lower().split()
    
    wordcount = defaultdict(int)
    for word in words:
        clean_word = word.strip("'")
        if clean_word:
            wordcount[clean_word] += 1
    
    return dict(wordcount)