'''
Array rotation/shifting

Rotate array in right (or left) for K places.

Input: [1, 2, 3, 4, 5, 6], 1
Output: [6, 1, 2, 3, 4, 5]

Input: [1, 2, 3, 4, 5, 6], 3
Output: [4, 5, 6, 1, 2, 3]

=========================================
The first solution is a simple one, split the array in two parts and swap those parts.
    Time Complexity:    O(N)
    Space Complexity:   O(N)
For the second one we need to compute GCD, to decide how many different sets are there.
And after that shift all elements in that set for one position in right/left.
(elements in a set are not neighboring elements)
(A Juggling Algorithm, https://www.geeksforgeeks.org/array-rotation/)
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''

import math

##############
# Solution 1 #
##############

def rotate_array_1(arr, k, right=True):
    if not arr:
        return arr
    
    n = len(arr)
    k %= n
    
    if k == 0:
        return arr
    
    if not right:
        k = n - k
    
    return arr[-k:] + arr[:-k]


##############
# Solution 2 #
##############

def rotate_array_2(arr, k, right=True):
    if not arr:
        return arr
    
    n = len(arr)
    k %= n
    
    if k == 0:
        return arr
    
    if not right:
        k = n - k
    
    cycles = math.gcd(n, k)
    
    for start in range(cycles):
        current = arr[start]
        pos = start
        
        while True:
            next_pos = (pos + k) % n
            if next_pos == start:
                break
            arr[pos] = arr[next_pos]
            pos = next_pos
        
        arr[pos] = current
    
    return arr

def gcd(a, b):
    return math.gcd(a, b)