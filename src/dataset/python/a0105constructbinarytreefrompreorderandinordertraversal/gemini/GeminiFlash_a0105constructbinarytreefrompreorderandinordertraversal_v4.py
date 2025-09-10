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

    def build_tree_helper(preorder_start, inorder_start, inorder_end):
      if preorder_start > len(preorder) - 1 or inorder_start > inorder_end:
        return None

      root_val = preorder[preorder_start]
      root = TreeNode(root_val)

      inorder_index = inorder_map[root_val]

      root.left = build_tree_helper(preorder_start + 1, inorder_start, inorder_index - 1)
      root.right = build_tree_helper(preorder_start + inorder_index - inorder_start + 1, inorder_index + 1, inorder_end)

      return root

    return build_tree_helper(0, 0, len(inorder) - 1)