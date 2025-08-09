def is_pangram(sentence):
    seen = 0
    for char in sentence:
        if 'a' <= char <= 'z':
            seen |= 1 << (ord(char) - 97)
        elif 'A' <= char <= 'Z':
            seen |= 1 << (ord(char) - 65)
        if seen == 67108863:
            return True
    return False