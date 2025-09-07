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
    result = []
    stack = []
    curr = root

    while curr or stack:
      if curr:
        result.append(curr.val)
        if curr.right:
          stack.append(curr.right)
        curr = curr.left
      else:
        curr = stack.pop()

    return result