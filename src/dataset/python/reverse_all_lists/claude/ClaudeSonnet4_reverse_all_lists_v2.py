'''
Reverse All Lists

Return a list that contains the items in reverse, but so that whenever each item is
itself a list, its elements are also reversed. This reversal of sublists must keep going on all the way
down, no matter how deep the nesting of these lists,

Input: [1, [2, 3, 4, 'yeah'], 5]
Output: [5, ['yeah', 4, 3, 2], 1]

=========================================
This problem can be solved using queue, stack (or recursion). Use in place reversing and save all
inner lists for reversing later.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def reverse_all_lists(arr):
    stack = [arr]
    
    while stack:
        inner_arr = stack.pop()
        
        # in place reverse
        inner_arr.reverse()
        
        # take all inner lists and save them for later
        for item in inner_arr:
            if isinstance(item, list):
                stack.append(item)
    
    return arr

def reverse_arr(arr):
    arr.reverse()
    return arr