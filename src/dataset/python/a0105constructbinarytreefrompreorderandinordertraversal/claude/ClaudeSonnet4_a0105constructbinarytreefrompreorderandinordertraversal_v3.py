# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
#
# DESC:
# =====
# Given preorder and inorder traversal of a tree, construct the binary tree.
#
# Note:
# You may assume that duplicates do not exist in the tree.
#
# For example, given
#
# preorder = [3,9,20,15,7]
# inorder = [9,3,15,20,7]
# Return the following binary tree:
#
#     3
#    / \
#   9  20
#     /  \
#    15   7
#
################################################
from typing import List

from utils.tree.TreeNode import TreeNode


class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder or not inorder:
            return None
        
        inorder_map = {val: idx for idx, val in enumerate(inorder)}
        self.preorder_idx = 0
        
        def build(left: int, right: int) -> TreeNode:
            if left > right:
                return None
            
            root_val = preorder[self.preorder_idx]
            self.preorder_idx += 1
            root = TreeNode(root_val)
            
            inorder_idx = inorder_map[root_val]
            
            root.left = build(left, inorder_idx - 1)
            root.right = build(inorder_idx + 1, right)
            
            return root
        
        return build(0, len(inorder) - 1)