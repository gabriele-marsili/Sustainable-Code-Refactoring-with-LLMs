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
# Solution 2 - Optimized #
##############

def find_kth_smallest(arr, k):
    n = len(arr)
    if not (1 <= k <= n):
        return None

    k -= 1
    left = 0
    right = n - 1

    while left <= right:
        pivot = optimized_pivoting(arr, left, right)

        if pivot > k:
            right = pivot - 1
        elif pivot < k:
            left = pivot + 1
        else:
            return arr[pivot]

    return None


def optimized_pivoting(arr, left, right):
    # Choose pivot as the middle element to avoid worst-case scenarios for already sorted/nearly sorted arrays
    mid = (left + right) // 2
    pivot_val = arr[mid]

    # Move pivot to the end for easier partitioning
    arr[mid], arr[right] = arr[right], arr[mid]

    store_index = left

    for i in range(left, right):
        if arr[i] < pivot_val:
            arr[i], arr[store_index] = arr[store_index], arr[i]
            store_index += 1

    arr[right], arr[store_index] = arr[store_index], arr[right]
    return store_index