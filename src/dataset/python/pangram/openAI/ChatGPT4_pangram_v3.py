def is_pangram(sentence):
    seen = set()
    for char in sentence.lower():
        if 'a' <= char <= 'z':
            seen.add(char)
            if len(seen) == 26:
                return True
    return False