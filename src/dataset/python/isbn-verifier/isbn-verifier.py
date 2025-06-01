def is_valid(isbn):
    clnisbn = isbn.replace('-', '')
    sumisbn = 0
    x = 10
    if len(clnisbn) == 10: 
        if (all(y.isnumeric() for y in clnisbn)) or (all(z.isnumeric() for z in clnisbn[:-1]) and clnisbn[-1] == 'X'):
            for d in clnisbn[:-1]:
                sumisbn += int(d)*x
                x -= 1
            if clnisbn[-1] == 'X':
                sumisbn += 10
            else:
                sumisbn += int(clnisbn[-1])
    return sumisbn % 11 == 0 and sumisbn > 0
