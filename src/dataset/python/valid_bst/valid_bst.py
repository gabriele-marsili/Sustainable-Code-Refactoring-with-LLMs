'''
Valid binary search tree

Check if a given tree is a valid binary search tree.

Input:  5
       / \
      1   7
         / \
        6   8
Output: True

=========================================
Visit all nodes and check if the values are inside the boundaries.
When visiting the left child use the value of the parent node like an upper boundary.
When visiting the right child use the value of the parent node like a lower boundary.
    Time Complexity:    O(N)
    Space Complexity:   O(N)        , because of the recursion stack (but this is the tree is one branch), O(LogN) if the tree is balanced.
'''

############
# Solution #
############

# import TreeNode class from tree_helpers.py
from tree_helpers import TreeNode

import math

def is_valid_bst(root):
    return is_valid_sub_bst(root, -math.inf, math.inf)

def is_valid_sub_bst(node, lower, upper):
    if node is None:
        return True

    if (node.val <= lower) or (node.val >= upper):
        return False

    # check left
    if not is_valid_sub_bst(node.left, lower, node.val):
        return False

    # check right
    if not is_valid_sub_bst(node.right, node.val, upper):
        return False

    return True