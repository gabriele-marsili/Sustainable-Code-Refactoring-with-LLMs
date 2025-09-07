# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/binary-tree-inorder-traversal/
#
# DESC:
# =====
# Given a binary tree, return the inorder traversal of its nodes' values.
#
# Example:
#
# Input: [1,null,2,3]
#    1
#     \
#      2
#     /
#    3
# Output: [1,3,2]
#
# Follow up: Recursive solution is trivial, could you do it iteratively?
#
################################################
from typing import List
from utils.tree.TreeNode import TreeNode


class Solution:
  def inorderTraversal(self, root: TreeNode) -> List[int]:
    result = []
    stack = []
    curr = root

    while curr or stack:
      if curr:
        stack.append(curr)
        curr = curr.left
      else:
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right

    return result