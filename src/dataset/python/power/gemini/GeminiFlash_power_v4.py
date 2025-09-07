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
        return 1 / power_recursive(a, -b)

    return power_recursive(a, b)

def power_recursive(a, b):
    if b == 0:
        return 1

    half_power = power_recursive(a, b // 2)
    squared_half = half_power * half_power

    if b % 2 == 1:
        return squared_half * a
    else:
        return squared_half