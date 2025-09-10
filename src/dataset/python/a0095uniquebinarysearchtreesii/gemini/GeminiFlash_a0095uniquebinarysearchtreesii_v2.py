# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/unique-binary-search-trees-ii/
#
# DESC:
# =====
# Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.
#
# Example:
# Input: 3
# Output:
# [
#   [1,null,3,2],
#   [3,2,null,1],
#   [3,1,null,null,2],
#   [2,1,3],
#   [1,null,2,null,3]
# ]
# Explanation:
# The above output corresponds to the 5 unique BST's shown below:
#
#    1         3     3      2      1
#     \       /     /      / \      \
#      3     2     1      1   3      2
#     /     /       \                 \
#    2     1         2                 3
#
################################################
from typing import List, Optional

from utils.tree.TreeNode import TreeNode


class Solution:
  def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
    if n == 0:
      return []
    return self.generate(1, n)

  def generate(self, start: int, end: int) -> List[Optional[TreeNode]]:
    if start > end:
      return [None]

    result: List[Optional[TreeNode]] = []
    for i in range(start, end + 1):
      left_trees: List[Optional[TreeNode]] = self.generate(start, i - 1)
      right_trees: List[Optional[TreeNode]] = self.generate(i + 1, end)

      for left in left_trees:
        for right in right_trees:
          root: Optional[TreeNode] = TreeNode(i)
          root.left = left
          root.right = right
          result.append(root)
    return result