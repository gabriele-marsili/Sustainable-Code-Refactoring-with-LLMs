def rotate(text, key):
    def shift_char(c, base):
        return chr((ord(c) - base + key) % 26 + base)

    return "".join(
        shift_char(c, 97) if 'a' <= c <= 'z' else
        shift_char(c, 65) if 'A' <= c <= 'Z' else c
        for c in text
    )