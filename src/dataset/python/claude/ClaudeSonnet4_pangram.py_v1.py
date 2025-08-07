def is_pangram(sentence):
    sentence_lower = sentence.lower()
    return all(chr(i) in sentence_lower for i in range(97, 123))