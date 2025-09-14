def is_valid(isbn):
    clnisbn = isbn.replace('-', '')
    
    if len(clnisbn) != 10:
        return False
    
    if not (clnisbn[:-1].isdigit() and (clnisbn[-1].isdigit() or clnisbn[-1] == 'X')):
        return False
    
    sumisbn = sum(int(digit) * (10 - i) for i, digit in enumerate(clnisbn[:-1]))
    sumisbn += 10 if clnisbn[-1] == 'X' else int(clnisbn[-1])
    
    return sumisbn % 11 == 0 and sumisbn > 0