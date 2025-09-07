# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/binary-tree-right-side-view/
#
# DESC:
# =====
# Given a binary tree, imagine yourself standing on the right side of it,
# return the values of the nodes you can see ordered from top to bottom.
#
# Example:
# Input: [1,2,3,null,5,null,4]
# Output: [1, 3, 4]
#
# Explanation:
#    1            <---
#  /   \
# 2     3         <---
#  \     \
#   5     4       <---
################################################
from typing import List
from collections import deque
from utils.tree.TreeNode import TreeNode


class Solution:
  def rightSideView(self, root: TreeNode) -> List[int]:
    if not root:
      return []

    result = []
    queue = deque([root])

    while queue:
      level_length = len(queue)
      rightmost_val = None

      for _ in range(level_length):
        node = queue.popleft()
        rightmost_val = node.val

        if node.left:
          queue.append(node.left)
        if node.right:
          queue.append(node.right)

      result.append(rightmost_val)

    return result