# -*- coding: utf-8 -*-
from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder or not inorder:
            return None

        inorder_index_map = {val: idx for idx, val in enumerate(inorder)}

        def helper(pre_start: int, pre_end: int, in_start: int, in_end: int) -> TreeNode:
            if pre_start > pre_end or in_start > in_end:
                return None

            root_val = preorder[pre_start]
            root = TreeNode(root_val)
            in_root_idx = inorder_index_map[root_val]
            left_tree_size = in_root_idx - in_start

            root.left = helper(pre_start + 1, pre_start + left_tree_size, in_start, in_root_idx - 1)
            root.right = helper(pre_start + left_tree_size + 1, pre_end, in_root_idx + 1, in_end)

            return root

        return helper(0, len(preorder) - 1, 0, len(inorder) - 1)