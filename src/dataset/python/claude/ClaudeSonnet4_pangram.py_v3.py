def is_pangram(sentence):
    seen = 0
    for char in sentence:
        if 'a' <= char <= 'z':
            seen |= 1 << (ord(char) - ord('a'))
        elif 'A' <= char <= 'Z':
            seen |= 1 << (ord(char) - ord('A'))
        if seen == 0x3ffffff:
            return True
    return False