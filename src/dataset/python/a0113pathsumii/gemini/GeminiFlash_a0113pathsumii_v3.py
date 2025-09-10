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
  def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
    result = []
    path = []

    def dfs(node: TreeNode, remaining_sum: int):
      if not node:
        return

      path.append(node.val)
      remaining_sum -= node.val

      if not node.left and not node.right and remaining_sum == 0:
        result.append(path.copy())
      else:
        dfs(node.left, remaining_sum)
        dfs(node.right, remaining_sum)

      path.pop()

    dfs(root, sum)
    return result