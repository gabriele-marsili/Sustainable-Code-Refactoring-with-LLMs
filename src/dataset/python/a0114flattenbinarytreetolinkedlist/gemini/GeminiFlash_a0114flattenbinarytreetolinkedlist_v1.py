# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
#
# DESC:
# =====
# Given a binary tree, flatten it to a linked list in-place.
#
# For example, given the following tree:
#
#     1
#    / \
#   2   5
#  / \   \
# 3   4   6
# The flattened tree should look like:
#
# 1
#  \
#   2
#    \
#     3
#      \
#       4
#        \
#         5
#          \
#           6
#
################################################
from utils.list.ListNode import ListNode
from utils.tree.TreeNode import TreeNode


class Solution:
  def flatten(self, root: TreeNode) -> None:
    """
    Do not return anything, modify root in-place instead.
    """

    def flatten_and_return_tail(node: TreeNode) -> TreeNode:
      """
      Helper function to flatten the subtree rooted at 'node' and return the tail of the flattened list.
      """
      if not node:
        return None

      left_tail = flatten_and_return_tail(node.left)
      right_tail = flatten_and_return_tail(node.right)

      if left_tail:
        original_right = node.right
        node.right = node.left
        node.left = None
        left_tail.right = original_right

        if right_tail:
          return right_tail
        else:
          return flatten_and_return_tail(original_right) or left_tail # Handle case where original_right is None
      else:
        if right_tail:
          return right_tail
        else:
          return node

    flatten_and_return_tail(root)