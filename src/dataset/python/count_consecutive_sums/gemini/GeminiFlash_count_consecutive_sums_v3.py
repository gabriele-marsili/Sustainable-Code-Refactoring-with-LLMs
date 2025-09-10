'''
Count Consecutive Sums

Positive integers can be expressed as sums of consecutive positive integers in various ways.

Input: 42
Output: 4
Output explanation: (a) 3 + 4 + 5 + 6 + 7 + 8 + 9, (b) 9 + 10 + 11 + 12, (c) 13 + 14 + 15 and (d) 42

=========================================
Iterate all N elements and add each to the sum, but store the start element and if the current sum is
bigger than N substract the front elements.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def count_consecutive_sums(n):
    count = 0
    for k in range(2, int((2 * n + 0.25)**0.5 - 0.5) + 2):
        if (n - (k * (k - 1) // 2)) > 0 and (n - (k * (k - 1) // 2)) % k == 0:
            count += 1
    return count