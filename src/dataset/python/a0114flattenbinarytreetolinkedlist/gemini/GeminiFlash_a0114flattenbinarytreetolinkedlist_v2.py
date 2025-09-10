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
    def flatten_recursive(node: TreeNode) -> TreeNode:
      """
      Helper function to flatten the tree recursively and return the tail.
      """
      if not node:
        return None

      if not node.left and not node.right:
        return node

      left_tail = flatten_recursive(node.left)
      right_tail = flatten_recursive(node.right)

      if node.left:
        original_right = node.right
        node.right = node.left
        node.left = None
        left_tail.right = original_right

        if right_tail:
          return right_tail
        else:
          return left_tail
      else:
        return right_tail

    flatten_recursive(root)