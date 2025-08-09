def is_pangram(sentence):
    seen = set()
    sentence_lower = sentence.lower()
    for char in sentence_lower:
        if 'a' <= char <= 'z':
            seen.add(char)
            if len(seen) == 26:
                return True
    return False