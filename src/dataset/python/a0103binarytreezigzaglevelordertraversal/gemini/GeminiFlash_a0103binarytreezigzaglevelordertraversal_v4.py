# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
#
# DESC:
# =====
# Given a binary tree, return the zigzag level order traversal of its nodes' values.
# (ie, from left to right, then right to left for the next level and alternate between).
#
# For example:
# Given binary tree [3,9,20,null,null,15,7],
#     3
#    / \
#   9  20
#     /  \
#    15   7
# return its zigzag level order traversal as:
# [
#   [3],
#   [20,9],
#   [15,7]
# ]
#
################################################
from typing import List

from utils.tree.TreeNode import TreeNode


class Solution:
  def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
    if not root:
      return []

    result = []
    level_nodes = [root]
    reverse = False

    while level_nodes:
      level_values = [node.val for node in level_nodes]
      if reverse:
        level_values.reverse()
      result.append(level_values)

      next_level_nodes = []
      for node in level_nodes:
        if node.left:
          next_level_nodes.append(node.left)
        if node.right:
          next_level_nodes.append(node.right)

      level_nodes = next_level_nodes
      reverse = not reverse

    return result