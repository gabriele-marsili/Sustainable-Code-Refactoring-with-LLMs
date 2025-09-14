def is_valid(isbn):
    clnisbn = isbn.replace('-', '')
    
    if len(clnisbn) != 10:
        return False
    
    sumisbn = 0
    
    for i in range(9):
        if not clnisbn[i].isdigit():
            return False
        sumisbn += int(clnisbn[i]) * (10 - i)
    
    last_char = clnisbn[9]
    if last_char == 'X':
        sumisbn += 10
    elif last_char.isdigit():
        sumisbn += int(last_char)
    else:
        return False
    
    return sumisbn % 11 == 0