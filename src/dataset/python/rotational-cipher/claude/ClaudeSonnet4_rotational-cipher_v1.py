def rotate(text, key):
    if not text:
        return ""
    
    key = key % 26
    if key == 0:
        return text
    
    result = []
    for char in text:
        if 'a' <= char <= 'z':
            result.append(chr((ord(char) - ord('a') + key) % 26 + ord('a')))
        elif 'A' <= char <= 'Z':
            result.append(chr((ord(char) - ord('A') + key) % 26 + ord('A')))
        else:
            result.append(char)
    
    return "".join(result)