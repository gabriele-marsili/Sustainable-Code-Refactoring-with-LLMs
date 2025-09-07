'''
Power

Implement pow (a^b , a**b) method

=========================================
Using divide and conquer approach.
    Time Complexity:    O(LogB)
    Space Complexity:   O(LogB)     , because of recursion calls stack
'''

############
# Solution #
############

def power(a, b):
    if b < 0:
        # negative power
        return 1 / power_iterative(a, -b)

    return power_iterative(a, b)

def power_iterative(a, b):
    res = 1
    while b > 0:
        if b % 2 == 1:
            res *= a
        a *= a
        b //= 2
    return res