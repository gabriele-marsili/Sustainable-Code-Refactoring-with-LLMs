def is_pangram(sentence):
    return all(chr(c) in sentence.lower() for c in range(97, 123))