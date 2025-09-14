'''
The Power Set

The power set of a set is the set of all its subsets.
Write a function that, given a set, generates its power set.

Input: [1, 2, 3]
Output: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
* You may also use a list or array to represent a set.

=========================================
Simple recursive combinations algorithm.
    Time Complexity:    O(Sum(C(I, N)))     , sum of all combinations between 0 and N = C(0, N) + C(1, N) + ... + C(N, N)
    Space Complexity:   O(Sum(C(I, N)))     , this is for the result array, if we print the number then the space complexity will be O(N) (because of the recursive stack)
'''


############
# Solution #
############

def power_set(arr):
    n = len(arr)
    result = []
    
    # Pre-allocate result list with known size (2^n)
    total_subsets = 1 << n
    result = [None] * total_subsets
    
    # Use bit manipulation for efficient subset generation
    for i in range(total_subsets):
        subset = []
        for j in range(n):
            if i & (1 << j):
                subset.append(arr[j])
        result[i] = subset
    
    return result

# Keep original function for interface compatibility but make it a wrapper
def combinations(result, arr, taken, pos):
    # This is kept for interface compatibility but not used in optimized version
    result.append([arr[i] for i in taken])
    
    n = len(arr)
    if n == pos:
        return
    
    for i in range(pos, n):
        taken.append(i)
        combinations(result, arr, taken, i + 1)
        taken.pop()