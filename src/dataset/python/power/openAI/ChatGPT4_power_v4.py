def power(a, b):
    if b < 0:
        return 1 / power_recursive(a, -b)
    return power_recursive(a, b)

def power_recursive(a, b):
    if b == 0:
        return 1
    if b == 1:
        return a

    half = power_recursive(a, b >> 1)
    return half * half * a if b & 1 else half * half