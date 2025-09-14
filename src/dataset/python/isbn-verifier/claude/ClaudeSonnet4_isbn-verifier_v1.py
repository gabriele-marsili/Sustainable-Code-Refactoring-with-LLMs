def is_valid(isbn):
    clnisbn = isbn.replace('-', '')
    
    if len(clnisbn) != 10:
        return False
    
    # Check validity and calculate sum in one pass
    sumisbn = 0
    for i in range(9):
        char = clnisbn[i]
        if not char.isdigit():
            return False
        sumisbn += int(char) * (10 - i)
    
    # Handle last character
    last_char = clnisbn[9]
    if last_char == 'X':
        sumisbn += 10
    elif last_char.isdigit():
        sumisbn += int(last_char)
    else:
        return False
    
    return sumisbn % 11 == 0