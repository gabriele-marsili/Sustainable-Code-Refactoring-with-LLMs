'''
Sum of non-adjacent numbers

Given a list of integers, write a function that returns the largest sum of non-adjacent numbers.
Numbers can be 0 or negative.

Input: [2, 4, 6, 2, 5]
Output: 13
Output explanation: We pick 2, 6, and 5.

Input: [5, 1, 1, 5]
Output: 10
Output explanation: We pick 5 and 5.

=========================================
Dynamic programming solution, but don't need the whole DP array, only the last 3 sums (DPs) are needed.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def sum_non_adjacent(arr):
    n = len(arr)
    if n == 0:
        return 0

    include = max(0, arr[0])
    exclude = 0

    for i in range(1, n):
        new_include = exclude + max(0, arr[i])
        new_exclude = max(include, exclude)
        include = new_include
        exclude = new_exclude

    return max(include, exclude)