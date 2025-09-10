# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder or not inorder:
            return None

        # Create a hashmap to store the index of each value in inorder for O(1) lookups
        inorder_index_map = {value: idx for idx, value in enumerate(inorder)}

        def helper(pre_start: int, in_start: int, in_end: int) -> TreeNode:
            if pre_start > len(preorder) - 1 or in_start > in_end:
                return None

            # Root is the first element in preorder
            root_val = preorder[pre_start]
            root = TreeNode(root_val)

            # Find the index of the root in inorder using the hashmap
            in_index = inorder_index_map[root_val]

            # Recursively build left and right subtrees
            root.left = helper(pre_start + 1, in_start, in_index - 1)
            root.right = helper(pre_start + (in_index - in_start) + 1, in_index + 1, in_end)

            return root

        return helper(0, 0, len(inorder) - 1)