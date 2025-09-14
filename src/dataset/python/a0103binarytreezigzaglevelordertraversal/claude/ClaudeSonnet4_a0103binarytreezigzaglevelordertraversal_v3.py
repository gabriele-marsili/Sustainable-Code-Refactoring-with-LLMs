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
    if root is None:
      return []

    queue = deque([root])
    result = []
    left_to_right = True
    
    while queue:
      level_size = len(queue)
      level_values = []
      
      for _ in range(level_size):
        node = queue.popleft()
        level_values.append(node.val)
        
        if node.left:
          queue.append(node.left)
        if node.right:
          queue.append(node.right)
      
      if not left_to_right:
        level_values.reverse()
      
      result.append(level_values)
      left_to_right = not left_to_right
    
    return result