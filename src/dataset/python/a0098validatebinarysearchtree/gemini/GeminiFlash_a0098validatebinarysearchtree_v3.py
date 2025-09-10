# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/validate-binary-search-tree/
#
# DESC:
# =====
# Given a binary tree, determine if it is a valid binary search tree (BST).
#
# Assume a BST is defined as follows:
# The left subtree of a node contains only nodes with keys less than the node's key.
# The right subtree of a node contains only nodes with keys greater than the node's key.
# Both the left and right subtrees must also be binary search trees.
#
#
# Example 1:
#     2
#    / \
#   1   3
# Input: [2,1,3]
# Output: true
#
# Example 2:
#     5
#    / \
#   1   4
#      / \
#     3   6
# Input: [5,1,4,null,null,3,6]
# Output: false
# Explanation: The root node's value is 5 but its right child's value is 4.
#
################################################
from utils.tree.TreeNode import TreeNode


class Solution:
  def isValidBST(self, root: TreeNode) -> bool:
    def helper(node, min_val, max_val):
      if not node:
        return True

      val = node.val
      if min_val is not None and val <= min_val:
        return False
      if max_val is not None and val >= max_val:
        return False

      return helper(node.left, min_val, val) and helper(node.right, val, max_val)

    return helper(root, None, None)