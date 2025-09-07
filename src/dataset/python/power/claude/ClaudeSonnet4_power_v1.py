'''
Power

Implement pow (a^b , a**b) method

=========================================
Using iterative approach with bit manipulation.
    Time Complexity:    O(LogB)
    Space Complexity:   O(1)
'''

############
# Solution #
############

def power(a, b):
    if b < 0:
        return 1 / power_recursive(a, -b)
    return power_recursive(a, b)

def power_recursive(a, b):
    if b == 0:
        return 1
    if a == 0:
        return 0
    if a == 1:
        return 1
    if a == -1:
        return -1 if b & 1 else 1
    
    result = 1
    base = a
    
    while b > 0:
        if b & 1:
            result *= base
        base *= base
        b >>= 1
    
    return result