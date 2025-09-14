'''
The Power Set

The power set of a set is the set of all its subsets.
Write a function that, given a set, generates its power set.

Input: [1, 2, 3]
Output: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
* You may also use a list or array to represent a set.

=========================================
Optimized iterative bit manipulation algorithm.
    Time Complexity:    O(N * 2^N)
    Space Complexity:   O(2^N)
'''


############
# Solution #
############

def power_set(arr):
    n = len(arr)
    result = []
    
    # Generate all 2^n subsets using bit manipulation
    for i in range(1 << n):  # 2^n iterations
        subset = []
        for j in range(n):
            if i & (1 << j):  # Check if j-th bit is set
                subset.append(arr[j])
        result.append(subset)
    
    return result