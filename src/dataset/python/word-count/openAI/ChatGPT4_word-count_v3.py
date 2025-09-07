from collections import Counter
import re

def count_words(sentence):
    sentence = re.sub(r"[^\w'\s]", ' ', sentence.replace('\n', ' ').replace('\t', ' '))
    words = (word.strip("'") for word in sentence.lower().split())
    return dict(Counter(words))