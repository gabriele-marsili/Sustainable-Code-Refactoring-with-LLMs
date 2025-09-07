def rotate(text, key):
    result = []
    for char in text:
        if 'a' <= char <= 'z':
            rotated_char = chr(((ord(char) - ord('a') + key) % 26) + ord('a'))
            result.append(rotated_char)
        elif 'A' <= char <= 'Z':
            rotated_char = chr(((ord(char) - ord('A') + key) % 26) + ord('A'))
            result.append(rotated_char)
        else:
            result.append(char)
    return ''.join(result)