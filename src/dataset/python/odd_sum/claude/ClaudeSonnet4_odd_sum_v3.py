def odd_sum(a, b):
    if a % 2 == 0:
        a += 1
    if b % 2 == 0:
        b -= 1
    
    if a > b:
        return 0
    
    n = (b - a) // 2 + 1
    return n * (a + b) // 2