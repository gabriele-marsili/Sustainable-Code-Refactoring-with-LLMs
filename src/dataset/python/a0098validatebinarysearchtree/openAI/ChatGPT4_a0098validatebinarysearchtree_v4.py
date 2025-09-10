# -*- coding: utf-8 -*-
from utils.tree.TreeNode import TreeNode

class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        def helper(node, min_val, max_val):
            if not node:
                return True
            if (min_val is not None and node.val <= min_val) or (max_val is not None and node.val >= max_val):
                return False
            return helper(node.left, min_val, node.val) and helper(node.right, node.val, max_val)
        return helper(root, None, None)