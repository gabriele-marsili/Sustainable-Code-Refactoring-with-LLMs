# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/path-sum-ii/
#
# DESC:
# =====
# Given a binary tree and a sum,
# find all root-to-leaf paths where each path's sum equals the given sum.
#
# Note: A leaf is a node with no children.
#
# Example:
# Given the below binary tree and sum = 22,
#
#       5
#      / \
#     4   8
#    /   / \
#   11  13  4
#  /  \    / \
# 7    2  5   1
# Return:
# [
#    [5,4,11,2],
#    [5,8,4,5]
# ]
#
################################################
from typing import List

from utils.tree.TreeNode import TreeNode


class Solution:
  def pathSum(self, root: TreeNode, target_sum: int) -> List[List[int]]:
    result = []

    def dfs(node: TreeNode, current_sum: int, path: List[int]):
      if not node:
        return

      current_sum += node.val
      path.append(node.val)

      if not node.left and not node.right and current_sum == target_sum:
        result.append(path.copy())  # Append a copy to avoid modification

      else:
        dfs(node.left, current_sum, path)
        dfs(node.right, current_sum, path)

      path.pop()  # Backtrack: remove the current node from the path

    dfs(root, 0, [])
    return result