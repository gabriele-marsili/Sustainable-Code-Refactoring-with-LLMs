def power(a, b):
    if b < 0:
        return 1.0 / power_recursive(a, -b)
    return power_recursive(a, b)

def power_recursive(a, b):
    if b == 0:
        return 1
    if b == 1:
        return a
    
    if b & 1:
        half_power = power_recursive(a, b >> 1)
        return a * half_power * half_power
    else:
        half_power = power_recursive(a, b >> 1)
        return half_power * half_power