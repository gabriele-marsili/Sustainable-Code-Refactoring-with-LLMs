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
from typing import List, Dict

from utils.tree.TreeNode import TreeNode


class Solution:
  def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    preorder_idx = 0

    def build_tree_recursive(inorder_left: int, inorder_right: int) -> TreeNode:
      nonlocal preorder_idx

      if inorder_left > inorder_right:
        return None

      root_val = preorder[preorder_idx]
      root = TreeNode(root_val)

      preorder_idx += 1

      inorder_idx = inorder_map[root_val]

      root.left = build_tree_recursive(inorder_left, inorder_idx - 1)
      root.right = build_tree_recursive(inorder_idx + 1, inorder_right)

      return root

    return build_tree_recursive(0, len(inorder) - 1)