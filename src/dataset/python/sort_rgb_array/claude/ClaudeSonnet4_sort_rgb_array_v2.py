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
    low = mid = 0
    high = len(arr) - 1
    
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
    r_count = g_count = 0
    
    # count R and G only
    for c in arr:
        if c == 'R':
            r_count += 1
        elif c == 'G':
            g_count += 1
    
    # assign colors directly
    for i in range(len(arr)):
        if i < r_count:
            arr[i] = 'R'
        elif i < r_count + g_count:
            arr[i] = 'G'
        else:
            arr[i] = 'B'
    
    return arr