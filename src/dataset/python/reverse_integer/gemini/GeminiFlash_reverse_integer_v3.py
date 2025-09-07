'''
Reverse Integer

Given signed integer, reverse digits of an integer.

Input: 123
Output: 321

Input: -123
Output: -321

Input: 120
Output: 21

=========================================
Simple solution, mod 10 to find all digits.
    Time Complexity:    O(N)    , N = number of digits
    Space Complexity:   O(1)
'''


############
# Solution #
############

def reverse_integer(x):
    sign = 1 if x >= 0 else -1
    x = abs(x)
    res = 0
    while x > 0:
        res = (res * 10) + (x % 10)
        x //= 10

    MAX_INT = 2**31 - 1
    MIN_INT = -2**31

    if res > MAX_INT:
        return 0
    if res < -MAX_INT:
        return 0

    return res * sign