'''
Find first missing positive integer (>0)

Given an array of integers, find the first missing positive integer in linear time and constant space.
In other words, find the lowest positive integer that does not exist in the array.
The array can contain duplicates and negative numbers as well.
Note: you can modify the input array in-place.

Input: [3, 4, -1, 1]
Output: 2

Input: [1, 2, 0]
Output: 3

=========================================
Move all values to their positions (val position = val - 1), in the end find the first
position which doesn't have the needed value.
    Time Complexity:    O(N)    , maybe nested loops look like O(N^2) but that not true
    Space Complexity:   O(1)
Play with indicies and mark them (make it negative),
a marked index means that the number equals to that index exist in the array.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


##############
# Solution 1 #
##############

def find_first_missing_1(a):
    n = len(a)

    for i in range(n):
        while (a[i] > 0) and (a[i] <= n):
            swap = a[i] - 1
            if a[i] == a[swap]:
                break

            # swap elements
            a[i], a[swap] = a[swap], a[i]

    for i in range(n):
        if a[i] - 1 != i:
            return i + 1

    return n + 1


##############
# Solution 2 #
##############

def find_first_missing_2(a):
    n = len(a)

    # eliminate all zeros and all negative numbers
    for i in range(n):
        if a[i] <= 0:
            a[i] = n + 1 # those values won't be used later

    # find all numbers in the range and mark all numbers at those positions as negative numbers
    for i in range(n):
        idx = abs(a[i]) - 1
        if idx >= n:
            continue

        # mark the element as found
        a[idx] = -abs(a[idx])

    # find the first non-negative position
    for i in range(n):
        if a[i] > 0:
            return i + 1

    return n + 1