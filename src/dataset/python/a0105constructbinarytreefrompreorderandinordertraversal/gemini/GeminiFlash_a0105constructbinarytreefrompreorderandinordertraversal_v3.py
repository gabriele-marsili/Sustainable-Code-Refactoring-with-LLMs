# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
#
# DESC:
# =====
# Given preorder and inorder traversal of a tree, construct the binary tree.
#
# Note:
# You may assume that duplicates do not exist in the tree.
#
# For example, given
#
# preorder = [3,9,20,15,7]
# inorder = [9,3,15,20,7]
# Return the following binary tree:
#
#     3
#    / \
#   9  20
#     /  \
#    15   7
#
################################################
from typing import List

from utils.tree.TreeNode import TreeNode


class Solution:
  def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
    if not preorder or len(preorder) != len(inorder):
      return None

    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    preorder_idx = 0

    def helper(in_left, in_right):
      nonlocal preorder_idx

      if in_left > in_right:
        return None

      root_val = preorder[preorder_idx]
      root = TreeNode(root_val)

      preorder_idx += 1

      inorder_index = inorder_map[root_val]

      root.left = helper(in_left, inorder_index - 1)
      root.right = helper(inorder_index + 1, in_right)

      return root

    return helper(0, len(inorder) - 1)