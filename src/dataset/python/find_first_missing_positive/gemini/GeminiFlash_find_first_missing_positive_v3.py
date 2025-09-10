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

    # Check if 1 is present. If not, you're done and 1 is the answer.
    if 1 not in a:
        return 1

    # Replace negative numbers, zeros,
    # and numbers larger than n by 1s.
    # After this conversion, a will contain
    # only positive numbers.
    for i in range(n):
        if a[i] <= 0 or a[i] > n:
            a[i] = 1

    # Use the index as a hash key and number sign as a presence detector.
    # For example, if a[1] is negative, it means that the number `1`
    # is present in the array.
    # If a[2] is positive, the number 2 is missing.
    for i in range(n):
        val = abs(a[i])
        if val <= n:
            idx = val - 1
            if a[idx] > 0:
                a[idx] = -a[idx]

    # Now the index of the first positive number
    # is equal to the first positive missing number.
    for i in range(n):
        if a[i] > 0:
            return i + 1

    return n + 1