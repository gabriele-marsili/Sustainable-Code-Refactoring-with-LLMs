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
        return arr[:]  # Return a copy to avoid modifying the original

    start = 0
    result = []

    for i in range(1, n):
        if arr[i] <= arr[i - 1]:
            # End of ascending sublist
            sublist = arr[start:i]
            result.extend(sublist[::-1])  # Reverse and extend
            start = i

    # Handle the last sublist
    sublist = arr[start:n]
    result.extend(sublist[::-1])

    return result