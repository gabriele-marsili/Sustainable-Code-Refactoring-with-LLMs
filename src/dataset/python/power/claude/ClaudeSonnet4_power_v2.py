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
        return 1.0 / power_iterative(a, -b)
    
    return power_iterative(a, b)

def power_recursive(a, b):
    return power_iterative(a, b)

def power_iterative(a, b):
    if b == 0:
        return 1
    
    result = 1
    base = a
    
    while b > 0:
        if b & 1:  # if b is odd
            result *= base
        base *= base
        b >>= 1  # b = b // 2
    
    return result