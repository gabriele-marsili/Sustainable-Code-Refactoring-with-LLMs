'''
Odd Sum

For a given range [а,b], find the sum of all odd numbers between a and b.

Input: 3, 9
Output: 24
Output explanation: 3+5+7+9=24

=========================================
Several different O(1) approaches exist. This is the explanation of my solution/formula.
3 + 5 + 7 + 9 can be written like (3 + 0) + (3 + 2) + (3 + 4) + (3 + 6)
that's (3 * 4) + (2 + 4 + 6), also this can be written like
(3 * 4) + ((2 * 1) + (2 * 2) + (2 * 3)) = 3 * 4 + 2 * (1 + 2 + 3)
And the formula is: Min_Odd * Num_Odds + 2 * Sum(Num_Odds)
Sum formula is N*(N-1)/2. (for all numbers smaller than N)
This is the simplest formula:
Min_Odd * Num_Odds + 2 * Num_Odds * (Num_Odds - 1) / 2 =
Num_Odds * (Min_Odd + Num_Odds - 1)
    Time Complexity:    O(1)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def odd_sum(a, b):
    # find first odd number using bitwise OR
    a |= 1
    # find last odd number using bitwise operations
    b -= (b & 1) ^ 1
    # count of odd numbers using bit shift
    n = (b - a) >> 1
    n += 1
    # use the formula from the description
    return n * (a + n - 1)