def rotate(text, key):
    result = []
    key = key % 26  # Normalize key to avoid unnecessary calculations
    
    for char in text:
        if char.isalpha():
            # Determine base (65 for uppercase, 97 for lowercase)
            base = 65 if char.isupper() else 97
            # Calculate rotated character
            rotated = chr((ord(char) - base + key) % 26 + base)
            result.append(rotated)
        else:
            result.append(char)
    
    return "".join(result)