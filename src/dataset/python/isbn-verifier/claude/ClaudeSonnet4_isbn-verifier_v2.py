def is_valid(isbn):
    clnisbn = isbn.replace('-', '')
    
    if len(clnisbn) != 10:
        return False
    
    # Check validity and calculate sum in one pass
    sumisbn = 0
    for i, char in enumerate(clnisbn):
        if i < 9:
            if not char.isdigit():
                return False
            sumisbn += int(char) * (10 - i)
        else:  # last character
            if char == 'X':
                sumisbn += 10
            elif char.isdigit():
                sumisbn += int(char)
            else:
                return False
    
    return sumisbn % 11 == 0 and sumisbn > 0