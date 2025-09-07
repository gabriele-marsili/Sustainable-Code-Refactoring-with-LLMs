def rotate(text, key):
    result = []
    for char in text:
        if 'a' <= char <= 'z':
            rotated_char = chr(((ord(char) - ord('a') + key) % 26) + ord('a'))
        elif 'A' <= char <= 'Z':
            rotated_char = chr(((ord(char) - ord('A') + key) % 26) + ord('A'))
        else:
            rotated_char = char
        result.append(rotated_char)
    return ''.join(result)