'''
Count Consecutive Sums

Positive integers can be expressed as sums of consecutive positive integers in various ways.

Input: 42
Output: 4
Output explanation: (a) 3 + 4 + 5 + 6 + 7 + 8 + 9, (b) 9 + 10 + 11 + 12, (c) 13 + 14 + 15 and (d) 42

=========================================
Mathematical approach using the fact that for consecutive integers starting at 'start' with length 'length',
the sum is: length * start + length * (length - 1) / 2 = n
Solving for start: start = (n - length * (length - 1) / 2) / length
    Time Complexity:    O(sqrt(N))
    Space Complexity:   O(1)
'''


############
# Solution #
############

def count_consecutive_sums(n):
    count = 0
    length = 1
    
    while length * (length - 1) // 2 < n:
        numerator = n - length * (length - 1) // 2
        if numerator % length == 0:
            start = numerator // length
            if start > 0:
                count += 1
        length += 1
    
    return count