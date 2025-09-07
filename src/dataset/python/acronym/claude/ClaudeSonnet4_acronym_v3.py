def abbreviate(words):
    result = []
    i = 0
    length = len(words)
    
    while i < length:
        char = words[i]
        if char not in '-_ ':
            result.append(char.upper())
            while i < length and words[i] not in '-_ ':
                i += 1
        else:
            i += 1
    
    return "".join(result)