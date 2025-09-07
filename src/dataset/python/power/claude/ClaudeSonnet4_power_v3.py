'''
Power

Implement pow (a^b , a**b) method

=========================================
Using divide and conquer approach.
    Time Complexity:    O(LogB)
    Space Complexity:   O(1)     , iterative approach eliminates recursion stack
'''

############
# Solution #
############

def power(a, b):
    if b < 0:
        return 1 / power_recursive(abs(a), -b) if a != 0 else float('inf')
    
    return power_recursive(a, b)

def power_recursive(a, b):
    if b == 0:
        return 1
    if a == 0:
        return 0
    if a == 1 or b == 1:
        return a
    
    result = 1
    base = a
    
    while b > 0:
        if b & 1:
            result *= base
        base *= base
        b >>= 1
    
    return result