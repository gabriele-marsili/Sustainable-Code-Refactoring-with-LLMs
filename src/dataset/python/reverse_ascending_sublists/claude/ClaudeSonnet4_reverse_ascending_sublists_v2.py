'''
Reverse Every Ascending Sublist

Create and return a new list that contains the same elements as the argument list items, but
reversing the order of the elements inside every maximal strictly ascending sublist

Input: [5, 7, 10, 4, 2, 7, 8, 1, 3]
Output: [10, 7, 5, 4, 8, 7, 2, 7, 1]
Output explanation: 5, 7, 10 => 10, 7, 5 ; 4 => 4; 2, 7, 8 => 8, 7, 2; 1, 3 => 3, 1

=========================================
Find the start and end of each sublist and reverse it in-place.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def reverse_ascending_sublists(arr):
    if not arr:
        return []

    n = len(arr)
    start = 0

    for i in range(1, n):
        # check if this the end of the strictly ascending sublist
        if arr[i] <= arr[i - 1]:
            if i - 1 > start:
                # reverse in-place using slice assignment
                arr[start:i] = arr[start:i][::-1]
            start = i

    # handle the last sublist
    if n - 1 > start:
        arr[start:n] = arr[start:n][::-1]

    return arr

def reverse_arr(arr, start, end):
    while start < end:
        # reverse the array from the start index to the end index by
        # swaping each element with the pair from the other part of the array
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

    return arr