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
    if n == 1:
        return max(arr[0], 0)
    
    # Use two variables instead of array for better memory efficiency
    prev2 = max(arr[0], 0)
    prev1 = max(prev2, arr[1])
    
    if n == 2:
        return prev1
    
    # Process remaining elements
    for i in range(2, n):
        current = max(prev1, prev2 + arr[i])
        prev2, prev1 = prev1, current
    
    return prev1