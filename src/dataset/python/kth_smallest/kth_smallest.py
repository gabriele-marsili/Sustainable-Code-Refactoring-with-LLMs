'''
K-th Smallest Number

Find the K-th smallest number in an unordered list.

Input: [6, 2, 4, 8, 10, 1, 11], 1
Output: 0

Input: [6, 2, 4, 8, 10, 0, 11], 2
Output: 2

Input: [6, 2, 4, 8, 10, 0, 11], 4
Output: 6

=========================================
This solution is based on the quick sort algorithm (pivoting, divide and conquer).
More precisly in-place quick sort. Recursive solution.
   Time Complexity:     O(N)    , O(N + N/2 + N/4 + N/8 + ... + 1 = 2*N = N)
   Space Complexity:    O(LogN) , because of the recursion stack
Completely the same algorithm as the previous one, but without recursion. This solution is cleaner.
This algorithm is called: QucikSelect - The quicksort pivoting logic but for searching kth smallest (not sorting the whole array) - O(n) complexity (n + n/2 + n/4 + ... + 1 = 2n)
https://en.wikipedia.org/wiki/Quickselect
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


##############
# Solution 1 #
##############

def find_kth_smallest_recursive(arr, k):
    n = len(arr)
    if k > n or k < 1:
        return None
    return kth_smallest(arr, k - 1, 0, n - 1)

def kth_smallest(arr, k, left, right):
    pivot = pivoting(arr, left, right)
    
    if pivot == k:
        return arr[pivot]
    elif pivot > k:
        return kth_smallest(arr, k, left, pivot - 1)
    else:
        return kth_smallest(arr, k, pivot + 1, right)

def pivoting(arr, left, right):
    pivot_val = arr[right]
    new_pivot = left
    
    for j in range(left, right):
        if arr[j] < pivot_val:
            arr[new_pivot], arr[j] = arr[j], arr[new_pivot]
            new_pivot += 1
    
    arr[new_pivot], arr[right] = arr[right], arr[new_pivot]
    return new_pivot

def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]


##############
# Solution 2 #
##############

def find_kth_smallest(arr, k):
    n = len(arr)
    if k > n or k < 1:
        return None

    k -= 1
    left = 0
    right = n - 1

    while left <= right:
        pivot = pivoting(arr, left, right)
        
        if pivot == k:
            return arr[pivot]
        elif pivot > k:
            right = pivot - 1
        else:
            left = pivot + 1
    
    return None