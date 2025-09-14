# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/binary-tree-level-order-traversal/
#
# DESC:
# =====
# Given a binary tree, return the level order traversal of its nodes' values.
# (ie, from left to right, level by level).
#
# For example:
# Given binary tree [3,9,20,null,null,15,7],
#     3
#    / \
#   9  20
#     /  \
#    15   7
# return its level order traversal as:
# [
#   [3],
#   [9,20],
#   [15,7]
# ]
#
################################################
from typing import List
from collections import deque

from utils.tree.TreeNode import TreeNode


class Solution:
  def levelOrder(self, root: TreeNode) -> List[List[int]]:
    if root is None:
      return []

    queue = deque([root])
    result = []
    while queue:
      level_size = len(queue)
      thisLevel = []
      for _ in range(level_size):
        node = queue.popleft()
        thisLevel.append(node.val)
        if node.left:
          queue.append(node.left)
        if node.right:
          queue.append(node.right)
      result.append(thisLevel)
    return result