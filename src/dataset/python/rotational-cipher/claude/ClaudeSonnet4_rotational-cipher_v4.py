def rotate(text, key):
    key = key % 26
    result = []
    
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            rotated = chr((ord(char) - base + key) % 26 + base)
            result.append(rotated)
        else:
            result.append(char)
    
    return ''.join(result)