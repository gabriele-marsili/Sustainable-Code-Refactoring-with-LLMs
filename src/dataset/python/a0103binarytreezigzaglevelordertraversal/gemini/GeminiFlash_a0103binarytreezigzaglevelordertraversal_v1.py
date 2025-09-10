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
from collections import deque

from utils.tree.TreeNode import TreeNode


class Solution:
  def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
    if not root:
      return []

    result = []
    queue = deque([root])
    reverse = False

    while queue:
      level_size = len(queue)
      level_nodes = []

      for _ in range(level_size):
        node = queue.popleft()
        level_nodes.append(node.val)

        if node.left:
          queue.append(node.left)
        if node.right:
          queue.append(node.right)

      if reverse:
        result.append(level_nodes[::-1])
      else:
        result.append(level_nodes)

      reverse = not reverse

    return result