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
from utils.tree.TreeNode import TreeNode


class Solution:
  def rightSideView(self, root: TreeNode) -> List[int]:
    if not root:
      return []
    
    result = []
    
    def dfs(node, depth):
      if not node:
        return
      
      if depth == len(result):
        result.append(node.val)
      
      dfs(node.right, depth + 1)
      dfs(node.left, depth + 1)
    
    dfs(root, 0)
    return result