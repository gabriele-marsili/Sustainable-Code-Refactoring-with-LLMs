def reverse_integer(x):
    if x == 0:
        return 0
    
    sign = -1 if x < 0 else 1
    x = abs(x)
    
    res = 0
    while x:
        res = res * 10 + x % 10
        x //= 10
    
    return res * sign