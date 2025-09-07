# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/binary-tree-preorder-traversal/
#
# DESC:
# =====
# Given a binary tree, return the preorder traversal of its nodes' values.
#
# Example:
#
# Input: [1,null,2,3]
#    1
#     \
#      2
#     /
#    3
#
# Output: [1,2,3]
# Follow up: Recursive solution is trivial, could you do it iteratively?
################################################
from typing import List

from utils.tree.TreeNode import TreeNode


class Solution:
  def preorderTraversal(self, root: TreeNode) -> List[int]:
    if not root:
      return []

    result = []
    stack = [root]
    
    while stack:
      node = stack.pop()
      result.append(node.val)
      
      if node.right:
        stack.append(node.right)
      if node.left:
        stack.append(node.left)

    return result