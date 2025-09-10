'''
Reverse Every Ascending Sublist

Create and return a new list that contains the same elements as the argument list items, but
reversing the order of the elements inside every maximal strictly ascending sublist

Input: [5, 7, 10, 4, 2, 7, 8, 1, 3]
Output: [10, 7, 5, 4, 8, 7, 2, 3, 1]
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
    n = len(arr)
    if n <= 1:
        return arr

    start = 0
    result = arr[:]  # Create a copy to avoid modifying the original list

    for i in range(1, n):
        if result[i] <= result[i - 1]:
            # Reverse the sublist from start to i-1
            left, right = start, i - 1
            while left < right:
                result[left], result[right] = result[right], result[left]
                left += 1
                right -= 1
            start = i

    # Reverse the last sublist
    left, right = start, n - 1
    while left < right:
        result[left], result[right] = result[right], result[left]
        left += 1
        right -= 1

    return result