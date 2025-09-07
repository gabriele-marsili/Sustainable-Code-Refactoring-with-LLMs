def power(a, b):
    if b < 0:
        return 1 / power_iterative(a, -b)
    return power_iterative(a, b)

def power_iterative(a, b):
    result = 1
    base = a
    while b > 0:
        if b % 2 == 1:
            result *= base
        base *= base
        b //= 2
    return result