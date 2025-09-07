def abbreviate(words):
    result = []
    i = 0
    length = len(words)
    
    while i < length:
        char = words[i]
        if char in '-_':
            char = ' '
        
        if char == ' ':
            while i < length and words[i] in ' -_':
                i += 1
            if i < length:
                result.append(words[i].upper())
        elif not result or words[i-1] in ' -_':
            result.append(char.upper())
        
        i += 1
    
    return ''.join(result)