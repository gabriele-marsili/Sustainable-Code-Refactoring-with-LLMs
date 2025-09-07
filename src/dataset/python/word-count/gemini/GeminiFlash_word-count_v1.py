import re
from collections import Counter

def count_words(sentence):
    sentence = re.sub(r"[\n\t]", " ", sentence)
    sentence = re.sub(r"[^\w']", " ", sentence)
    words = [word.strip("'") for word in sentence.lower().split()]
    return Counter(words)