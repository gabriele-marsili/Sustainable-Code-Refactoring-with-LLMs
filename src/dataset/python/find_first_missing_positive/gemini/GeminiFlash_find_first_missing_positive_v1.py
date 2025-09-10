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
        while 0 < a[i] <= n and a[i] != a[a[i] - 1]:
            swap_idx = a[i] - 1
            a[i], a[swap_idx] = a[swap_idx], a[i]

    for i in range(n):
        if a[i] != i + 1:
            return i + 1

    return n + 1


##############
# Solution 2 #
##############

def find_first_missing_2(a):
    n = len(a)

    # Move all non-positive numbers to the beginning of the array
    j = 0
    for i in range(n):
        if a[i] <= 0:
            a[i], a[j] = a[j], a[i]
            j += 1

    # Consider only the positive part of the array
    for i in range(j, n):
        num = abs(a[i])
        if j <= num <= n and a[num - 1] > 0:
            a[num - 1] = -a[num - 1]

    # Find the first positive number in the modified array
    for i in range(j, n):
        if a[i] > 0:
            return i - j + 1

    return n - j + 1