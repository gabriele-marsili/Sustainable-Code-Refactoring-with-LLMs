'''
Kth Smallest Element in a BST

Given a binary search tree, write a function kthSmallest to find the kth smallest element in it

Input: 3    , k = 1
      / \
     1   4
      \
       2
Output: 1

Input: 5    , k = 3
      / \
     3   6
    / \
   2   4
  /
 1
Output: 3

=========================================
Traverse Inorder the tree (Type of depth first traversal: left, root, right) and count the nodes.
When the Kth node is found, return that node.
    Time Complexity:    O(N)
    Space Complexity:   O(N)        , because of the recursion stack (but this is if the tree is one branch), O(LogN) if the tree is balanced.
'''


############
# Solution #
############

class TreeNode:
    def __init__(self, val, left=None, right=None):
        '''Definition for binary tree.'''
        self.val = val
        self.left = left
        self.right = right

def find_kth_smallest_node_bst(root, k):
    return search(root, k)[1]

def search(node, k):
    if node is None:
        return (k, None)

    # check left
    left = search(node.left, k)
    if left[0] == 0:
        return left

    # check current node
    k = left[0] - 1
    if k == 0:
        return (k, node)

    # check right
    return search(node.right, k)