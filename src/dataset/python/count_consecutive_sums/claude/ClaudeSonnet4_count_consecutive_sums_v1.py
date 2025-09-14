'''
Count Consecutive Sums

Positive integers can be expressed as sums of consecutive positive integers in various ways.

Input: 42
Output: 4
Output explanation: (a) 3 + 4 + 5 + 6 + 7 + 8 + 9, (b) 9 + 10 + 11 + 12, (c) 13 + 14 + 15 and (d) 42

=========================================
Mathematical approach using the formula for consecutive sums.
For k consecutive numbers starting at a: n = k*a + k*(k-1)/2
Solving for a: a = (n - k*(k-1)/2) / k
    Time Complexity:    O(sqrt(N))
    Space Complexity:   O(1)
'''


############
# Solution #
############

def count_consecutive_sums(n):
    count = 0
    k = 1
    
    while k * (k - 1) // 2 < n:
        numerator = n - k * (k - 1) // 2
        if numerator % k == 0:
            a = numerator // k
            if a > 0:
                count += 1
        k += 1
    
    return count