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
    if not root:
      return
    
    current = root
    while current:
      if current.left:
        rightmost = current.left
        while rightmost.right:
          rightmost = rightmost.right
        
        rightmost.right = current.right
        current.right = current.left
        current.left = None
      
      current = current.right