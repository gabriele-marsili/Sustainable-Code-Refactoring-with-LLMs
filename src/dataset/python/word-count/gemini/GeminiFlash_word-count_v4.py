import re

def count_words(sentence):
    sentence = re.sub(r'[\n\t]', ' ', sentence)
    sentence = re.sub(r"[^a-zA-Z0-9']", ' ', sentence)
    words = [word.strip("'") for word in sentence.lower().split()]
    wordcount = {}
    for word in words:
        if word:
            wordcount[word] = wordcount.get(word, 0) + 1
    return wordcount