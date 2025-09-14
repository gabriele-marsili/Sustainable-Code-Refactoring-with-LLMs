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
from typing import List
from functools import lru_cache

from utils.tree.TreeNode import TreeNode


class Solution:
    def __init__(self):
        self._memo = {}
    
    def generateTrees(self, n: int) -> List[TreeNode]:
        if n < 1:
            return []
        self._memo.clear()
        return self._generate(1, n)

    def _generate(self, start: int, end: int) -> List[TreeNode]:
        if start > end:
            return [None]

        key = (start, end)
        if key in self._memo:
            return self._clone_trees(self._memo[key], start)

        if start == end:
            result = [TreeNode(start)]
            self._memo[key] = result
            return result

        result = []
        for root_val in range(start, end + 1):
            left_trees = self._generate(start, root_val - 1)
            right_trees = self._generate(root_val + 1, end)
            
            for left in left_trees:
                for right in right_trees:
                    root = TreeNode(root_val)
                    root.left = left
                    root.right = right
                    result.append(root)
        
        self._memo[key] = result
        return result
    
    def _clone_trees(self, trees: List[TreeNode], offset: int) -> List[TreeNode]:
        if not trees or trees[0] is None:
            return trees
        
        return [self._clone_tree(tree, offset) for tree in trees]
    
    def _clone_tree(self, node: TreeNode, offset: int) -> TreeNode:
        if node is None:
            return None
        
        new_node = TreeNode(node.val + offset)
        new_node.left = self._clone_tree(node.left, offset)
        new_node.right = self._clone_tree(node.right, offset)
        return new_node