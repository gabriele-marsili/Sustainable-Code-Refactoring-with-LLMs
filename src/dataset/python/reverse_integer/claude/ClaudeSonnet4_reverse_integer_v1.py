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
    if x == 0:
        return 0

    sign = -1 if x < 0 else 1
    x = abs(x)

    res = 0
    while x:
        res = (res << 3) + (res << 1) + (x % 10)  # res * 10 using bit shifts
        x //= 10

    return res * sign