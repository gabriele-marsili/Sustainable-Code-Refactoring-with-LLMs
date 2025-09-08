'''
Sort RGB Array

Given an array of strictly the characters 'R', 'G', and 'B', segregate
the values of the array so that all the Rs come first, the Gs come second, and the Bs come last.
You can only swap elements of the array.
Do this in linear time and in-place.

Input: ['G', 'B', 'R', 'R', 'B', 'R', 'G']
Output: ['R', 'R', 'R', 'G', 'G', 'B', 'B']

=========================================
Play with pointers/indices and swap elements. (only one iteration)
Save the last R, G and B indices, when adding some color, move the rest indices by 1.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
Count R, G, B and populate the array after that. (2 iterations)
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def sort_rgb_array(arr):
    n = len(arr)
    low, mid = 0, 0
    high = n - 1

    while mid <= high:
        if arr[mid] == 'R':
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 'G':
            mid += 1
        else:  # arr[mid] == 'B'
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1

    return arr


##############
# Solution 2 #
##############

def sort_rgb_array_2(arr):
    counts = {'R': 0, 'G': 0, 'B': 0}
    for x in arr:
        counts[x] += 1

    i = 0
    for color in ['R', 'G', 'B']:
        for _ in range(counts[color]):
            arr[i] = color
            i += 1
    return arr