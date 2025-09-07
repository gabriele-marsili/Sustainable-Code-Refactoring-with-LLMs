def power(a, b):
    if b < 0:
        return 1 / power_recursive(a, -b)
    return power_recursive(a, b)

def power_recursive(a, b):
    result = 1
    base = a
    while b > 0:
        if b % 2 == 1:
            result *= base
        base *= base
        b //= 2
    return result