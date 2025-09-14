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

def rotate_array_1(arr, k, right=True):
    if not arr:
        return arr
    
    n = len(arr)
    k %= n
    
    if k == 0:
        return arr[:]
    
    if not right:
        k = n - k
    
    return arr[-k:] + arr[:-k]

def rotate_array_2(arr, k, right=True):
    if not arr:
        return arr
    
    n = len(arr)
    k %= n
    
    if k == 0:
        return arr
    
    if not right:
        k = n - k
    
    sets = math.gcd(n, k)
    
    for i in range(sets):
        curr = arr[i]
        j = i
        
        while True:
            next_j = (j + k) % n
            if next_j == i:
                break
            arr[j] = arr[next_j]
            j = next_j
        
        arr[j] = curr
    
    return arr

def gcd(a, b):
    return math.gcd(a, b)