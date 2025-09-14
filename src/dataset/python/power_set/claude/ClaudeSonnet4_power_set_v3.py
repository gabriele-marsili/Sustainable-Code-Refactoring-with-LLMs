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
    result.reserve = lambda x: None
    
    for i in range(1 << n):
        subset = []
        for j in range(n):
            if i & (1 << j):
                subset.append(arr[j])
        result.append(subset)
    
    return result

def combinations(result, arr, taken, pos):
    current = [arr[i] for i in taken]
    result.append(current)

    n = len(arr)
    if pos == n:
        return

    for i in range(pos, n):
        taken.append(i)
        combinations(result, arr, taken, i + 1)
        taken.pop()