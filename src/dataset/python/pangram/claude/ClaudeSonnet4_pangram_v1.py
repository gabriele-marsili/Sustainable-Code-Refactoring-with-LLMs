import string

def is_pangram(sentence):
    sentence_lower = sentence.lower()
    for char in string.ascii_lowercase:
        if char not in sentence_lower:
            return False
    return True