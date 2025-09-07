'''
Reverse array

Reverse an array, in constant space and linear time complexity.

Input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

=========================================
Reverse the whole array by swapping pair letters in-place (first with last, second with second from the end, etc).
Exist 2 more "Pythonic" ways of reversing arrays/strings (but not in-place, they're creating a new list):
- reversed_arr = reversed(arr)
- reversed_arr = arr[::-1]
But I wanted to show how to implement a reverse algorithm step by step so someone will know how to implement it in other languages.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def reverse_arr(arr):
    if not arr:
        return arr
    
    length = len(arr)
    half_length = length >> 1
    end = length - 1
    
    for start in range(half_length):
        arr[start], arr[end - start] = arr[end - start], arr[start]
    
    return arr

def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]